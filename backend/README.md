
## Development
Backend API built with FastAPI.

## Backend tests

From the repository root, install the application and test dependencies into the
existing backend virtual environment, then run pytest:

```bash
backend/.venv/bin/python -m pip install -r backend/requirements-test.txt
backend/.venv/bin/python -m pytest -c backend/pytest.ini
```

Alternatively, from `backend/` with the virtual environment activated, run
`python -m pytest`.

Tests override `DATABASE_URL` and `JWT_SECRET_KEY` before importing the app and
replace `get_db` with sessions against a fresh in-memory SQLite database for each
test. The application's default database engine is blocked from connecting.
Development PostgreSQL, real credentials, and external services are not used.
Cookie authentication, password hashing, and API routes run normally.

SQLite tests exercise API behavior and persistence across requests, but do not
validate PostgreSQL-specific behavior or Alembic migrations.
