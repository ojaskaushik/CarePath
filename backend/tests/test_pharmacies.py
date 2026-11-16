"""Provider requests are mocked; no public service or development DB is used."""

from concurrent.futures import ThreadPoolExecutor
import logging
from threading import Event

from fastapi import HTTPException
from fastapi.testclient import TestClient
import httpx
import pytest

from app.main import app
from app.routes.pharmacies import get_pharmacy_service
from app.schemas.pharmacy import LocationSearchRequest, PharmacySearchRequest
from app.services.pharmacy_search import PharmacySearchService

BASE = "/api/v1/pharmacies"


def geocode(name="Toronto", osm_id=1, country="ca", postcode=None, **changes):
    address = {"city": name, "state": "Ontario", "country_code": country, "ISO3166-2-lvl4": "CA-ON"}
    if postcode:
        address["postcode"] = postcode
    return {"osm_type": "relation", "osm_id": osm_id, "name": name,
            "display_name": f"{name}, Ontario, Canada", "lat": "43.65", "lon": "-79.38",
            "address": address, **changes}


def pharmacy(osm_id=1, kind="node", lat=43.651, lon=-79.38, **tags):
    result = {"type": kind, "id": osm_id, "tags": {"amenity": "pharmacy", **tags}}
    if kind == "node":
        result.update(lat=lat, lon=lon)
    else:
        result["center"] = {"lat": lat, "lon": lon}
    return result


@pytest.fixture
def pilot():
    now = [100.0]
    calls = []
    replies = []

    def respond(request):
        calls.append(request)
        assert "authorization" not in request.headers
        assert "cookie" not in request.headers
        assert "CarePath" in request.headers["User-Agent"]
        assert replies, "Unexpected upstream request"
        reply = replies.pop(0)
        if isinstance(reply, Exception):
            raise reply
        return reply

    service = PharmacySearchService(transport=httpx.MockTransport(respond), clock=lambda: now[0])
    previous = app.dependency_overrides.copy()
    app.dependency_overrides[get_pharmacy_service] = lambda: service
    with TestClient(app) as client:
        yield client, service, replies, calls, now
    app.dependency_overrides.clear()
    app.dependency_overrides.update(previous)


def select_location(pilot, row=None):
    client, _, replies, _, _ = pilot
    replies.append(httpx.Response(200, json=[row or geocode()]))
    response = client.post(f"{BASE}/locations", json={"query": "Toronto"})
    assert response.status_code == 200
    return response.json()["locations"][0]["id"]


@pytest.mark.parametrize("query", ["", " ", "a", "x" * 121, "123 Main Street", "M5V", "D1D 1D1", "M5V 2T", "Toronto;DROP", "Toronto,,Ontario", "Toronto, Ontario, USA"])
def test_invalid_queries_do_not_contact_provider(pilot, query):
    client, _, _, calls, _ = pilot
    assert client.post(f"{BASE}/locations", json={"query": query}).status_code == 422
    assert calls == []


def test_city_geocoding_returns_candidates_without_choosing_or_saving(pilot):
    client, _, replies, calls, _ = pilot
    replies.append(httpx.Response(200, json=[geocode(), geocode(name="Toronto", osm_id=2, lat="43.66")]))
    response = client.post(f"{BASE}/locations", json={"query": " Toronto ,  ON "})
    assert response.status_code == 200
    assert len(response.json()["locations"]) == 2
    assert response.json()["attribution"]["url"] == "https://www.openstreetmap.org/copyright"
    params = calls[0].url.params
    assert params["countrycodes"] == "ca"
    assert params["city"] == "Toronto"
    assert params["state"] == "ON"
    assert params["limit"] == "5"
    assert "q" not in params
    assert len(calls) == 1  # geocoding never triggers Overpass automatically


def test_postal_code_is_normalized_and_exact_match_required(pilot):
    client, _, replies, calls, _ = pilot
    replies.append(httpx.Response(200, json=[geocode(postcode="M5V 2T6"), geocode(osm_id=2, postcode="M5V")]))
    response = client.post(f"{BASE}/locations", json={"query": "m5v2t6"})
    assert response.status_code == 200
    assert len(response.json()["locations"]) == 1
    assert calls[0].url.params["postalcode"] == "M5V 2T6"
    assert "city" not in calls[0].url.params


@pytest.mark.parametrize("row,query", [
    (geocode(country="us"), "Toronto"),
    (geocode(name="Toronton"), "Toronto"),
    (geocode(), "Toronto, Quebec"),
    (geocode(postcode="M5V"), "M5V 2T6"),
])
def test_no_foreign_or_unrelated_geocoding_fallback(pilot, row, query):
    client, _, replies, calls, _ = pilot
    replies.append(httpx.Response(200, json=[row]))
    response = client.post(f"{BASE}/locations", json={"query": query})
    assert response.status_code == 200
    assert response.json()["locations"] == []
    assert len(calls) == 1


def test_suburb_and_accented_city_are_supported(pilot):
    client, _, replies, _, now = pilot
    replies.append(httpx.Response(200, json=[geocode(name="Scarborough")]))
    assert client.post(f"{BASE}/locations", json={"query": "Scarborough"}).json()["locations"]
    now[0] += 2
    replies.append(httpx.Response(200, json=[geocode(name="Montréal")]))
    assert client.post(f"{BASE}/locations", json={"query": "Montreal"}).json()["locations"]


def test_no_geocoding_matches_is_not_an_upstream_error(pilot):
    client, _, replies, _, _ = pilot
    replies.append(httpx.Response(200, json=[]))
    response = client.post(f"{BASE}/locations", json={"query": "Unknown Place"})
    assert response.status_code == 200
    assert response.json()["locations"] == []


def test_pharmacies_normalize_nodes_ways_relations_and_missing_fields(pilot):
    client, _, replies, calls, _ = pilot
    location_id = select_location(pilot)
    replies.append(httpx.Response(200, json={"elements": [
        pharmacy(1, name="Test Pharmacy", **{"addr:housenumber": "10", "addr:street": "Example St", "addr:city": "Toronto", "addr:postcode": "M5V 2T6", "contact:phone": "+1 416 555 0100", "opening_hours": "Mo-Fr 09:00-17:00"}),
        pharmacy(2, kind="way", lat=43.652, name="Second Pharmacy", **{"addr:full": "20 Example St"}),
        pharmacy(3, kind="relation", lat=43.653),
        pharmacy(4, lat=45),
        pharmacy(5, **{"addr:country": "US"}),
    ]}))
    response = client.post(f"{BASE}/search", json={"location_id": location_id})
    assert response.status_code == 200
    items = response.json()["pharmacies"]
    assert [p["id"] for p in items] == ["node/1", "way/2", "relation/3"]
    assert items[0]["address"] == "10 Example St, Toronto, M5V 2T6"
    assert items[0]["phone"] == "+1 416 555 0100"
    assert items[0]["opening_hours"] == "Mo-Fr 09:00-17:00"
    assert 100 < items[0]["distance_m"] < 120
    assert items[2]["name"] is None and items[2]["address"] is None
    assert items[2]["phone"] is None and items[2]["opening_hours"] is None
    assert "origin=" not in items[0]["directions_url"]
    assert "destination=" in items[0]["directions_url"]
    query = calls[-1].content.decode()
    assert "pharmacy" in query and "nwr" in query and "10000" in query
    assert "ISO3166-1" in query and "canada" in query
    assert client.cookies.items() == {}.items()


def test_deduplication_keeps_distinct_neighbours_and_richer_record(pilot):
    client, _, replies, _, _ = pilot
    location_id = select_location(pilot)
    address = {"addr:full": "10 Example St"}
    replies.append(httpx.Response(200, json={"elements": [
        pharmacy(1, name="Same Pharmacy", **address),
        pharmacy(1, name="Same Pharmacy", **address),
        pharmacy(2, kind="way", name="Same Pharmacy", phone="555-0100", **address),
        pharmacy(3, name="Different Pharmacy", **address),
        pharmacy(4, name="Chain", **{"addr:city": "Toronto"}),
        pharmacy(5, name="Chain", **{"addr:city": "Toronto"}),
        pharmacy(6), pharmacy(7),
    ]}))
    items = client.post(f"{BASE}/search", json={"location_id": location_id}).json()["pharmacies"]
    assert len(items) == 6
    assert any(p["id"] == "way/2" and p["phone"] == "555-0100" for p in items)


def test_results_are_sorted_then_limited_and_cache_reused(pilot):
    client, _, replies, calls, _ = pilot
    location_id = select_location(pilot)
    replies.append(httpx.Response(200, json={"elements": [pharmacy(i, lat=43.65 + i / 10000) for i in range(30, 0, -1)]}))
    response = client.post(f"{BASE}/search", json={"location_id": location_id})
    assert len(response.json()["pharmacies"]) == 20
    assert response.json()["pharmacies"][0]["id"] == "node/1"
    shorter = client.post(f"{BASE}/search", json={"location_id": location_id, "limit": 1})
    assert len(shorter.json()["pharmacies"]) == 1
    assert len(calls) == 2


@pytest.mark.parametrize("payload", [
    {"location_id": "a" * 32, "radius_m": 10001},
    {"location_id": "a" * 32, "radius_m": 0},
    {"location_id": "a" * 32, "limit": 21},
    {"location_id": "a" * 32, "limit": 0},
    {"location_id": "a" * 32, "radius_m": True},
    {"location_id": "a" * 32, "latitude": 43},
    {"location_id": "1);out;"},
])
def test_search_validation_does_not_contact_provider(pilot, payload):
    client, _, _, calls, _ = pilot
    assert client.post(f"{BASE}/search", json=payload).status_code == 422
    assert not calls


def test_unknown_and_expired_candidates_require_new_geocoding(pilot):
    client, _, _, calls, now = pilot
    assert client.post(f"{BASE}/search", json={"location_id": "b" * 32}).status_code == 410
    location_id = select_location(pilot)
    now[0] += 1801
    assert client.post(f"{BASE}/search", json={"location_id": location_id}).status_code == 410
    assert len(calls) == 1


@pytest.mark.parametrize("provider", ["nominatim", "overpass"])
@pytest.mark.parametrize("reply,status", [
    (httpx.Response(403, text="secret diagnostic"), 502),
    (httpx.Response(500, text="secret diagnostic"), 502),
    (httpx.Response(429, headers={"Retry-After": "120"}), 503),
    (httpx.Response(200, text="not JSON"), 502),
    (httpx.ReadTimeout("secret submitted location"), 504),
    (httpx.ConnectError("secret submitted location"), 503),
])
def test_provider_failures_are_safe_and_never_retried(pilot, provider, reply, status):
    client, _, replies, calls, _ = pilot
    if provider == "overpass":
        location_id = select_location(pilot)
        path, body = "/search", {"location_id": location_id}
    else:
        path, body = "/locations", {"query": "Toronto"}
    before = len(calls)
    replies.append(reply)
    response = client.post(BASE + path, json=body)
    assert response.status_code == status
    assert "secret" not in response.text
    assert len(calls) == before + 1
    if reply is not None and isinstance(reply, httpx.Response) and reply.status_code == 429:
        assert response.headers["Retry-After"] == "120"
        assert client.post(BASE + path, json=body).status_code == 429
        assert len(calls) == before + 1


@pytest.mark.parametrize("payload", [{"elements": [], "remark": "runtime timeout"}, {}, {"elements": [None]}, {"elements": [pharmacy(lat=float("inf"))]}])
def test_partial_or_malformed_overpass_responses_are_not_empty_success(pilot, payload):
    client, _, replies, _, _ = pilot
    location_id = select_location(pilot)
    # JSON cannot encode infinity; test invalid provider coordinates as text.
    if payload.get("elements") and isinstance(payload["elements"][0], dict):
        payload["elements"][0]["lat"] = "Infinity"
    replies.append(httpx.Response(200, json=payload))
    assert client.post(f"{BASE}/search", json={"location_id": location_id}).status_code == 502


@pytest.mark.parametrize("payload", [{}, [None], [{"address": None}], [geocode(lat="nan")], [geocode(display_name=None)]])
def test_malformed_geocoding_response_is_safe(pilot, payload):
    client, _, replies, _, _ = pilot
    replies.append(httpx.Response(200, json=payload))
    assert client.post(f"{BASE}/locations", json={"query": "Toronto"}).status_code == 502


def test_geocoding_rate_limit_and_cache_expiry(pilot):
    client, _, replies, calls, now = pilot
    select_location(pilot)
    assert client.post(f"{BASE}/locations", json={"query": " TORONTO "}).status_code == 200
    assert client.post(f"{BASE}/locations", json={"query": "Ottawa"}).status_code == 429
    assert len(calls) == 1
    now[0] += 1.1
    replies.append(httpx.Response(200, json=[geocode(name="Ottawa", osm_id=2)]))
    assert client.post(f"{BASE}/locations", json={"query": "Ottawa"}).status_code == 200
    now[0] += 1801
    replies.append(httpx.Response(200, json=[geocode()]))
    assert client.post(f"{BASE}/locations", json={"query": "Toronto"}).status_code == 200
    assert len(calls) == 3


def test_empty_pharmacy_results_are_cached_then_expire(pilot):
    client, _, replies, calls, now = pilot
    location_id = select_location(pilot)
    for advance in [0, 301]:
        now[0] += advance
        replies.append(httpx.Response(200, json={"elements": []}))
        response = client.post(f"{BASE}/search", json={"location_id": location_id})
        assert response.status_code == 200
        assert response.json()["pharmacies"] == []
        before = len(calls)
        assert client.post(f"{BASE}/search", json={"location_id": location_id}).status_code == 200
        assert len(calls) == before
    assert len(calls) == 3


def test_cache_is_bounded_and_eviction_is_safe(pilot):
    _, service, _, _, now = pilot
    for i in range(200):
        service.remember(("test", i), i, 10)
    assert len(service.cache) == 128
    assert service.cached(("test", 0)) is None
    now[0] += 11
    assert service.cached(("test", 199)) is None
    assert len(service.cache) == 0


def test_concurrent_requests_do_not_queue_or_bypass_rate_limit():
    started, finish = Event(), Event()
    calls = []

    def respond(request):
        calls.append(request)
        started.set()
        assert finish.wait(5)
        return httpx.Response(200, json=[geocode()])

    service = PharmacySearchService(transport=httpx.MockTransport(respond))
    with ThreadPoolExecutor(max_workers=2) as pool:
        first = pool.submit(service.locations, LocationSearchRequest(query="Toronto"))
        try:
            assert started.wait(5)
            with pytest.raises(HTTPException) as busy:
                service.locations(LocationSearchRequest(query="Ottawa"))
            assert busy.value.status_code == 503
        finally:
            finish.set()
        assert first.result().locations
    with pytest.raises(HTTPException) as limited:
        service.locations(LocationSearchRequest(query="Ottawa"))
    assert limited.value.status_code == 429
    assert len(calls) == 1


def test_upstream_http_logs_do_not_expose_location_and_no_auth_is_forwarded(pilot, caplog):
    client, _, replies, _, _ = pilot
    replies.append(httpx.Response(200, json=[geocode()]))
    with caplog.at_level(logging.INFO, logger="httpx"):
        response = client.post(f"{BASE}/locations", json={"query": "Toronto"}, headers={"Authorization": "Bearer private-token", "Cookie": "carepath_session=private-cookie"})
    assert response.status_code == 200
    assert "Toronto" not in caplog.text
    assert "private-token" not in caplog.text
    assert "private-cookie" not in caplog.text


def test_generated_postcode_without_osm_reference_is_supported(pilot):
    client, _, replies, _, _ = pilot
    row = geocode(postcode="M5V 2T6")
    row.pop("osm_type")
    row.pop("osm_id")
    replies.append(httpx.Response(200, json=[row]))
    response = client.post(f"{BASE}/locations", json={"query": "M5V 2T6"})
    assert response.status_code == 200
    location_id = response.json()["locations"][0]["id"]
    replies.append(httpx.Response(200, json={"elements": []}))
    assert client.post(f"{BASE}/search", json={"location_id": location_id}).status_code == 200
