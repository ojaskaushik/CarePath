"""HTTP integration fixtures: fresh in-memory SQLite database for every test."""

import os
import sys

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Fail closed if application configuration was imported before test isolation.
if "app.database.config" in sys.modules or "app.security.tokens" in sys.modules:
    raise RuntimeError("Run backend tests in a fresh pytest process")

# Override even existing environment values before importing the application.
# load_dotenv does not override these, so backend/.env cannot select PostgreSQL.
os.environ["DATABASE_URL"] = "sqlite+pysqlite:///:memory:"
os.environ["JWT_SECRET_KEY"] = "carepath-test-only-secret-never-use-in-production"

from app.database.config import Base, engine as application_engine
from app.database.session import get_db
from app.main import app


@event.listens_for(application_engine, "connect")
def reject_application_database_connection(*_):
    raise AssertionError("Tests must use the overridden database dependency")


@pytest.fixture
def db_engine():
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    @event.listens_for(engine, "connect")
    def enable_foreign_keys(connection, _):
        connection.execute("PRAGMA foreign_keys=ON")

    Base.metadata.create_all(engine)
    try:
        yield engine
    finally:
        engine.dispose()


@pytest.fixture
def client(db_engine):
    sessions = sessionmaker(bind=db_engine, autoflush=False)

    def override_get_db():
        with sessions() as session:
            yield session

    previous_overrides = app.dependency_overrides.copy()
    app.dependency_overrides[get_db] = override_get_db
    try:
        with TestClient(app) as client:
            client.headers["Origin"] = "http://localhost:5173"
            yield client
    finally:
        app.dependency_overrides.clear()
        app.dependency_overrides.update(previous_overrides)


@pytest.fixture
def register_and_login(client):
    def register(email="alice@example.com"):
        response = client.post(
            "/api/v1/auth/signup",
            json={"full_name": "Test User", "email": email, "password": "test-password"},
        )
        assert response.status_code == 201
        login = client.post(
            "/api/v1/auth/login", json={"email": email, "password": "test-password"}
        )
        assert login.status_code == 200
        return response.json()

    return register


@pytest.fixture
def authenticated_client(client, register_and_login):
    register_and_login()
    return client


@pytest.fixture
def conversation(authenticated_client):
    response = authenticated_client.post("/api/v1/conversations", json={})
    assert response.status_code == 201
    return response.json()
