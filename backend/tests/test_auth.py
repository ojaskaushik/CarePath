from datetime import datetime, timedelta, timezone

import jwt
import pytest
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.security.password import verify_password
from app.security.tokens import JWT_ALGORITHM, JWT_SECRET_KEY


def test_registration_login_and_cookie_session(client, db_engine):
    response = client.post(
        "/api/v1/auth/signup",
        json={"full_name": " Alice Example ", "email": "Alice@Example.com", "password": "test-password"},
    )
    assert response.status_code == 201
    user = response.json()
    assert user["full_name"] == "Alice Example"
    assert user["email"] == "alice@example.com"
    assert "password" not in user
    assert "password_hash" not in user
    with Session(db_engine) as db:
        stored = db.scalar(select(User).where(User.id == user["id"]))
        assert stored.password_hash != "test-password"
        assert verify_password("test-password", stored.password_hash)

    login = client.post(
        "/api/v1/auth/login",
        json={"email": "ALICE@example.com", "password": "test-password"},
    )
    assert login.status_code == 200
    assert login.json()["access_token"]
    assert login.json()["user"] == user
    assert "HttpOnly" in login.headers["set-cookie"]
    assert "SameSite=lax" in login.headers["set-cookie"]
    assert client.get("/api/v1/auth/me").json() == user
    assert client.post("/api/v1/auth/logout").status_code == 200
    assert "carepath_session" not in client.cookies
    assert client.get("/api/v1/auth/me").status_code == 401


def test_duplicate_registration(client, register_and_login):
    register_and_login()
    response = client.post(
        "/api/v1/auth/signup",
        json={"full_name": "Another User", "email": "ALICE@example.com", "password": "test-password"},
    )
    assert response.status_code == 409


@pytest.mark.parametrize("email,password", [
    ("alice@example.com", "wrong-password"),
    ("missing@example.com", "test-password"),
])
def test_invalid_login(client, register_and_login, email, password):
    register_and_login()
    client.cookies.clear()
    response = client.post("/api/v1/auth/login", json={"email": email, "password": password})
    assert response.status_code == 401
    assert "carepath_session" not in client.cookies


@pytest.mark.parametrize("token", ["invalid-token", "expired"])
def test_invalid_or_expired_session(client, register_and_login, token):
    user = register_and_login()
    client.cookies.clear()
    if token == "expired":
        token = jwt.encode(
            {"sub": str(user["id"]), "exp": datetime.now(timezone.utc) - timedelta(minutes=1)},
            JWT_SECRET_KEY,
            algorithm=JWT_ALGORITHM,
        )
    client.cookies.set("carepath_session", token)
    assert client.get("/api/v1/auth/me").status_code == 401
    assert client.get("/api/v1/conversations").status_code == 401


@pytest.mark.parametrize("method,path,payload", [
    ("GET", "/api/v1/auth/me", None),
    ("GET", "/api/v1/conversations", None),
    ("POST", "/api/v1/conversations", {}),
    ("GET", "/api/v1/conversations/1", None),
    ("POST", "/api/v1/conversations/1/messages", {"content": "hello"}),
    ("PATCH", "/api/v1/conversations/1", {"title": "renamed"}),
    ("DELETE", "/api/v1/conversations/1", None),
])
def test_protected_routes_require_authentication(client, method, path, payload):
    assert client.request(method, path, json=payload).status_code == 401
