from fastapi import APIRouter, Depends

from app.schemas.pharmacy import (
    LocationSearchRequest, LocationSearchResponse,
    PharmacySearchRequest, PharmacySearchResponse,
)
from app.services.pharmacy_search import PharmacySearchService

router = APIRouter(prefix="/api/v1/pharmacies", tags=["Pharmacies"])

# One shared limiter/cache for ONE backend worker/instance. No DB dependency.
service = PharmacySearchService()


def get_pharmacy_service() -> PharmacySearchService:
    return service


@router.post("/locations", response_model=LocationSearchResponse)
def search_locations(
    data: LocationSearchRequest,
    provider: PharmacySearchService = Depends(get_pharmacy_service),
):
    return provider.locations(data)


@router.post("/search", response_model=PharmacySearchResponse)
def search_pharmacies(
    data: PharmacySearchRequest,
    provider: PharmacySearchService = Depends(get_pharmacy_service),
):
    return provider.pharmacies(data)
