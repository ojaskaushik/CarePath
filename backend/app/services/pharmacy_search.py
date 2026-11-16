"""Public OSM access for a low-traffic, ONE worker/instance portfolio demo.

No persistent storage, user identifiers, request logging, automatic retries, or
background tasks. The bounded cache holds public location/results temporarily.
Multi-worker deployment would require shared throttling before enabling this.
"""

from collections import OrderedDict
from math import asin, ceil, cos, isfinite, radians, sin, sqrt
import logging
import os
from threading import BoundedSemaphore, Lock
from time import monotonic
import unicodedata
from urllib.parse import urlencode, urlsplit
from uuid import uuid4

from fastapi import HTTPException
import httpx

from app.schemas.pharmacy import (
    LocationCandidate, LocationSearchRequest, LocationSearchResponse, POSTAL_CODE,
    Pharmacy, PharmacySearchRequest, PharmacySearchResponse,
)

USER_AGENT = "CarePathPortfolio/0.1 (+https://github.com/ojaskaushik/CarePath)"
PRIVATE_PROVIDER_HOSTS = set()


def omit_provider_request_logs(record):
    # HTTPX's INFO request logs include geocoding URL parameters. Do not emit
    # those records even if application-wide logging is later enabled.
    return not any(
        isinstance(arg, httpx.URL) and arg.host in PRIVATE_PROVIDER_HOSTS
        for arg in (record.args if isinstance(record.args, tuple) else ())
    )


logging.getLogger("httpx").addFilter(omit_provider_request_logs)


def normalized(value: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFKD", value).casefold() if c.isalnum())


def text(tags: dict, key: str) -> str | None:
    value = tags.get(key)
    return value.strip() or None if isinstance(value, str) else None


def distance_m(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    a, b = radians(lat1), radians(lat2)
    h = sin((b - a) / 2) ** 2 + cos(a) * cos(b) * sin(radians(lon2 - lon1) / 2) ** 2
    return 6371000 * 2 * asin(sqrt(min(1, max(0, h))))


def coordinates(data: dict) -> tuple[float, float]:
    try:
        if isinstance(data.get("lat"), bool) or isinstance(data.get("lon"), bool):
            raise ValueError
        lat, lon = float(data["lat"]), float(data["lon"])
        if not isfinite(lat) or not isfinite(lon) or not -90 <= lat <= 90 or not -180 <= lon <= 180:
            raise ValueError
        return lat, lon
    except (KeyError, TypeError, ValueError):
        raise HTTPException(502, "Location provider returned invalid coordinates") from None


class PharmacySearchService:
    def __init__(self, *, transport=None, clock=monotonic, cache_size=128):
        self.transport = transport
        self.clock = clock
        self.cache_size = cache_size
        self.cache = OrderedDict()
        self.lock = Lock()
        # Reject busy requests rather than accumulating a queue of searches.
        self.upstream_slot = BoundedSemaphore(1)
        self.next_request = {"nominatim": 0.0, "overpass": 0.0}
        self.nominatim_url = os.getenv("NOMINATIM_URL", "https://nominatim.openstreetmap.org/search")
        self.overpass_url = os.getenv("OVERPASS_URL", "https://overpass-api.de/api/interpreter")
        PRIVATE_PROVIDER_HOSTS.update(urlsplit(url).hostname for url in [self.nominatim_url, self.overpass_url])

    def cached(self, key):
        with self.lock:
            now = self.clock()
            for expired in [k for k, (expiry, _) in self.cache.items() if expiry <= now]:
                del self.cache[expired]
            entry = self.cache.get(key)
            if entry is not None:
                self.cache.move_to_end(key)
                return entry[1]
        return None

    def remember(self, key, value, ttl):
        with self.lock:
            self.cache[key] = (self.clock() + ttl, value)
            self.cache.move_to_end(key)
            while len(self.cache) > self.cache_size:
                self.cache.popitem(last=False)

    def request(self, provider, *, params=None, data=None):
        if not self.upstream_slot.acquire(blocking=False):
            raise HTTPException(503, "Pharmacy search is busy; try again shortly", headers={"Retry-After": "2"})
        try:
            wait = self.next_request[provider] - self.clock()
            if wait > 0:
                raise HTTPException(429, "Search rate limit reached; try again shortly", headers={"Retry-After": str(ceil(wait))})
            # Additional spacing after completion guarantees <=1 Nominatim call/s,
            # even under concurrent requests or a slow connection setup.
            try:
                with httpx.Client(
                    transport=self.transport,
                    timeout=httpx.Timeout(25.0, connect=5.0),
                    follow_redirects=False,
                    trust_env=False,
                    headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
                ) as client:
                    url = self.nominatim_url if provider == "nominatim" else self.overpass_url
                    response = client.get(url, params=params) if provider == "nominatim" else client.post(url, data=data)
            except httpx.TimeoutException:
                raise HTTPException(504, "Location provider timed out; try again later") from None
            except httpx.RequestError:
                raise HTTPException(503, "Location provider is unavailable; try again later") from None
            finally:
                self.next_request[provider] = self.clock() + (1.1 if provider == "nominatim" else 2.0)

            if response.status_code == 429:
                retry = response.headers.get("Retry-After", "")
                cooldown = max(60, min(int(retry), 3600)) if retry.isdigit() else 60
                self.next_request[provider] = self.clock() + cooldown
                raise HTTPException(503, "Location provider is rate limited; try again later", headers={"Retry-After": str(cooldown)})
            if not 200 <= response.status_code < 300:
                raise HTTPException(502, "Location provider could not complete the search")
            try:
                return response.json()
            except ValueError:
                raise HTTPException(502, "Location provider returned an invalid response") from None
        finally:
            self.upstream_slot.release()

    def locations(self, request: LocationSearchRequest) -> LocationSearchResponse:
        cache_key = ("geocode", request.query.casefold())
        result = self.cached(cache_key)
        if result is not None:
            # A candidate may have been evicted independently from the query.
            for location in result.locations:
                self.remember(("location", location.id), location, 1800)
            return result

        params = {"format": "jsonv2", "addressdetails": 1, "countrycodes": "ca", "limit": 5, "country": "Canada"}
        postal = bool(POSTAL_CODE.fullmatch(request.query))
        parts = request.query.split(", ")
        params["postalcode" if postal else "city"] = parts[0]
        if not postal and len(parts) > 1:
            params["state"] = parts[1]
        payload = self.request("nominatim", params=params)
        if not isinstance(payload, list):
            raise HTTPException(502, "Location provider returned an invalid response")
        locations = []
        seen = set()
        for row in payload[:5]:
            if not isinstance(row, dict) or not isinstance(row.get("address"), dict):
                raise HTTPException(502, "Location provider returned an invalid response")
            address = row["address"]
            if (text(address, "country_code") or "").lower() != "ca":
                continue
            # Reject fallback postcodes/cities rather than accepting a provider's
            # broader or similarly spelled location. No automatic second lookup.
            if postal:
                if normalized(text(address, "postcode") or "") != normalized(request.query):
                    continue
            else:
                names = [row.get("name", "")] + [address.get(k, "") for k in ("city", "town", "village", "hamlet", "suburb", "borough", "municipality", "locality")]
                if not any(normalized(name) == normalized(parts[0]) for name in names if isinstance(name, str)):
                    continue
                if len(parts) > 1:
                    province = [text(address, "state") or "", (text(address, "ISO3166-2-lvl4") or "").removeprefix("CA-")]
                    if not any(normalized(p) == normalized(parts[1]) for p in province):
                        continue
            label = text(row, "display_name")
            if not label:
                raise HTTPException(502, "Location provider returned an invalid response")
            lat, lon = coordinates(row)
            # Generated postcode points need not have an OSM object ID.
            location = LocationCandidate(id=uuid4().hex, display_name=label, latitude=lat, longitude=lon)
            identity = (label, lat, lon)
            if identity not in seen:
                seen.add(identity)
                locations.append(location)
        result = LocationSearchResponse(locations=locations)
        self.remember(cache_key, result, 1800)
        for location in locations:
            self.remember(("location", location.id), location, 1800)
        return result

    def pharmacies(self, request: PharmacySearchRequest) -> PharmacySearchResponse:
        location = self.cached(("location", request.location_id))
        if location is None:
            raise HTTPException(410, "Location selection expired or is unknown; search for the city or postal code again")
        # Cache the complete bounded-radius result, allowing different display
        # limits without repeating Overpass queries.
        key = ("pharmacies", location.id, request.radius_m)
        pharmacies = self.cached(key)
        if pharmacies is None:
            query = (
                f'[out:json][timeout:20][maxsize:2097152];'
                'area["ISO3166-1"="CA"]["admin_level"="2"]->.canada;'
                f'nwr["amenity"="pharmacy"](area.canada)(around:{request.radius_m},{location.latitude},{location.longitude});'
                'out center;'
            )
            payload = self.request("overpass", data={"data": query})
            if not isinstance(payload, dict) or payload.get("remark") or not isinstance(payload.get("elements"), list):
                raise HTTPException(502, "Pharmacy provider returned an incomplete or invalid response")
            pharmacies = normalize_pharmacies(payload["elements"], location, request.radius_m)[:20]
            self.remember(key, pharmacies, 300)
        return PharmacySearchResponse(location=location, radius_m=request.radius_m, pharmacies=pharmacies[:request.limit])


def normalize_pharmacies(elements, location, radius_m):
    pharmacies = []
    complete_addresses = set()
    for element in elements:
        if not isinstance(element, dict) or not isinstance(element.get("tags"), dict):
            raise HTTPException(502, "Pharmacy provider returned an invalid listing")
        tags = element["tags"]
        if tags.get("amenity") != "pharmacy":
            continue
        if text(tags, "addr:country") and text(tags, "addr:country").upper() not in {"CA", "CANADA"}:
            continue
        kind, osm_id = element.get("type"), element.get("id")
        if kind not in {"node", "way", "relation"} or type(osm_id) is not int or osm_id <= 0:
            raise HTTPException(502, "Pharmacy provider returned an invalid listing")
        position = element if kind == "node" else element.get("center")
        if not isinstance(position, dict):
            raise HTTPException(502, "Pharmacy provider returned invalid coordinates")
        lat, lon = coordinates(position)
        distance = distance_m(location.latitude, location.longitude, lat, lon)
        if distance > radius_m:
            continue
        street = " ".join(value for value in [text(tags, "addr:housenumber"), text(tags, "addr:street")] if value)
        address = text(tags, "addr:full") or ", ".join(value for value in [street, text(tags, "addr:city"), text(tags, "addr:province"), text(tags, "addr:postcode")] if value) or None
        if text(tags, "addr:full") or (text(tags, "addr:housenumber") and text(tags, "addr:street")):
            complete_addresses.add(f"{kind}/{osm_id}")
        pharmacies.append(Pharmacy(
            id=f"{kind}/{osm_id}", name=text(tags, "name"), address=address,
            latitude=lat, longitude=lon, phone=text(tags, "phone") or text(tags, "contact:phone"),
            opening_hours=text(tags, "opening_hours"), distance_m=round(distance),
            directions_url="https://www.google.com/maps/dir/?" + urlencode({"api": 1, "destination": f"{lat},{lon}"}),
        ))
    # Keep richer records first. Only merge distinct OSM objects when name AND
    # address match AND centres are within 25m; do not merge unnamed neighbours.
    pharmacies.sort(key=lambda p: (-sum(bool(v) for v in [p.name, p.address, p.phone, p.opening_hours]), p.distance_m, p.id))
    unique = []
    seen_ids = set()
    for pharmacy in pharmacies:
        if pharmacy.id in seen_ids:
            continue
        seen_ids.add(pharmacy.id)
        if pharmacy.id in complete_addresses and pharmacy.name and pharmacy.address and any(
            p.id in complete_addresses and
            p.name and p.address and normalized(p.name) == normalized(pharmacy.name)
            and normalized(p.address) == normalized(pharmacy.address)
            and distance_m(p.latitude, p.longitude, pharmacy.latitude, pharmacy.longitude) <= 25
            for p in unique
        ):
            continue
        unique.append(pharmacy)
    return sorted(unique, key=lambda p: (p.distance_m, p.id))
