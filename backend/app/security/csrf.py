from fastapi import HTTPException, Request, status

SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}

ALLOWED_ORIGINS = {
    "http://localhost:5173",
    "http://127.0.0.1:5173",
}


def verify_csrf(request: Request) -> None:
    if request.method in SAFE_METHODS:
        return

    origin = request.headers.get("origin")

    if origin not in ALLOWED_ORIGINS:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Request origin is not allowed",
        )
