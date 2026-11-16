import re

from pydantic import BaseModel, ConfigDict, Field, field_validator

POSTAL_CODE = re.compile(r"[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTVWXYZ] ?\d[ABCEGHJ-NPRSTVWXYZ]\d", re.I)


class LocationSearchRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    query: str = Field(min_length=2, max_length=120)

    @field_validator("query")
    @classmethod
    def normalize_query(cls, value: str) -> str:
        value = " ".join(value.split())
        if POSTAL_CODE.fullmatch(value):
            compact = value.replace(" ", "").upper()
            return compact[:3] + " " + compact[3:]
        parts = [part.strip() for part in value.split(",")]
        if (
            not 2 <= len(value) <= 120
            or not any(char.isalpha() for char in parts[0])
            or len(parts) > 3
            or any(not part for part in parts)
            or any(not (char.isalpha() or char in " .'-’") for part in parts for char in part)
            or (len(parts) == 3 and parts[2].casefold() not in {"canada", "ca"})
        ):
            raise ValueError("Enter a Canadian city (optionally followed by province) or full postal code")
        return ", ".join(parts)


class LocationCandidate(BaseModel):
    id: str
    display_name: str
    latitude: float = Field(ge=-90, le=90, allow_inf_nan=False)
    longitude: float = Field(ge=-180, le=180, allow_inf_nan=False)


class Attribution(BaseModel):
    text: str = "© OpenStreetMap contributors"
    url: str = "https://www.openstreetmap.org/copyright"


class LocationSearchResponse(BaseModel):
    locations: list[LocationCandidate]
    attribution: Attribution = Field(default_factory=Attribution)


class PharmacySearchRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    location_id: str = Field(pattern=r"^[a-f0-9]{32}$")
    radius_m: int = Field(default=10000, ge=1, le=10000, strict=True)
    limit: int = Field(default=20, ge=1, le=20, strict=True)


class Pharmacy(BaseModel):
    id: str
    name: str | None
    address: str | None
    latitude: float
    longitude: float
    phone: str | None
    opening_hours: str | None
    distance_m: int
    directions_url: str


class PharmacySearchResponse(BaseModel):
    location: LocationCandidate
    radius_m: int
    pharmacies: list[Pharmacy]
    attribution: Attribution = Field(default_factory=Attribution)
    distance_note: str = "Approximate straight-line distances; map centres may not be entrances."
