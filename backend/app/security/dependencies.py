from fastapi import Cookie, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.security.tokens import decode_access_token

bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(
        bearer_scheme
    ),
    session_cookie: str | None = Cookie(
        default=None,
        alias="carepath_session",
    ),
    db: Session = Depends(get_db),
) -> User:
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired authentication session",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token = None

    if session_cookie:
        token = session_cookie
    elif credentials and credentials.scheme.lower() == "bearer":
        token = credentials.credentials

    if not token:
        raise unauthorized

    user_id = decode_access_token(token)

    if user_id is None:
        raise unauthorized

    user = db.get(User, user_id)

    if user is None:
        raise unauthorized

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account is disabled",
        )

    return user
