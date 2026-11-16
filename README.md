# CarePath 🩺

**Your Health. Your Next Step.**

CarePath is a full-stack healthcare information project that aims to make general health education easier to find and understand. It combines a searchable Health Information Library, personal accounts, and saved demonstration conversations in one accessible interface.

> **Project status:** The Health Library, account flows, conversation management, and automated frontend/backend tests are implemented. Chat returns a preset demonstration response. Personalized guidance, medication integration, live pharmacy results, and production readiness remain in development.

## Features

### Available now

- **Accounts:** Sign up, log in, log out, and view your profile dashboard.
- **Saved conversations:** Signed-in messages and demo replies save automatically. Reopen, continue, rename, or delete conversations from your profile.
- **Guest demo chat:** Try the conversational interface without an account. Guest messages are temporary and disappear on a full refresh; they are not saved to an account.
- **Session handling:** Cookie-based sessions are restored on startup. Invalid or expired sessions clear the frontend's signed-in state when an authenticated conversation request returns HTTP 401.
- **Health Information Library:** Browse and search six source-backed educational articles without signing in, with topic pages, citations, source-check dates, and educational disclaimers.
- **Navigation:** Desktop and mobile navigation, homepage library links, and account menus.
- **Pharmacy search preview:** Enter a location to preview the interface. It does not retrieve live pharmacies.

### Under development

- Personalized health guidance and symptom-assessment functionality.
- Medication and over-the-counter (OTC) information integration; Health Canada's Drug Product Database is a possible future source.
- Live pharmacy discovery, verified listings, and location-provider integration.
- Additional privacy controls, production security, deployment, and monitoring.

## 📚 Health Information Library

Open `/health-library` through the Navbar or homepage. Search matches topic names, descriptions, and keywords, regardless of capitalization. Each topic has its own route at `/health-library/:slug`.

| Topic | Route |
|---|---|
| Common Cold | `/health-library/common-cold` |
| Headaches | `/health-library/headaches` |
| Sore Throat | `/health-library/sore-throat` |
| Seasonal Allergies | `/health-library/seasonal-allergies` |
| Dehydration | `/health-library/dehydration` |
| Constipation | `/health-library/constipation` |

Articles cover overviews, common symptoms or relevant information, general self-care, when to seek professional attention, emergency warning signs, and further reading. Citations link to official resources from MedlinePlus, the NHS, CDC, Manitoba Health, and NIDDK.

Content and source metadata live in [healthTopics.js](frontend/src/data/healthTopics.js). The library is frontend data, not a PostgreSQL content collection or a health-content API.

**Source-backed does not mean clinically reviewed.** “Sources checked” records a source check, not medical approval. Clinical review and manual browser and screen-reader validation remain outstanding.

## Tech stack

| Area | Technologies |
|---|---|
| Frontend | React 19, JavaScript/JSX, Vite 8, React Router 7 |
| Styling | Tailwind CSS 4, page/component CSS, Lucide React |
| Backend | Python, FastAPI, Pydantic, Uvicorn |
| Persistence | PostgreSQL, SQLAlchemy, Psycopg, Alembic migrations |
| Authentication | Argon2 password hashing through pwdlib, PyJWT, HTTP-only session cookies |
| Frontend checks | Vitest, jsdom, React Testing Library, DOM Testing Library, Oxlint |
| Backend tests | pytest, HTTPX/FastAPI TestClient, isolated SQLite databases |
| Development | npm, Concurrently, Git |

## Project structure

```text
CarePath/
├── frontend/
│   ├── src/
│   │   ├── components/         # Navbar, homepage sections, feature cards
│   │   ├── data/               # Health topics, articles, and citations
│   │   ├── pages/              # Screens and page regression tests
│   │   ├── services/           # Shared API configuration and requests
│   │   ├── styles/             # Page and component styles
│   │   ├── test/               # Test cleanup and navigation tests
│   │   ├── App.jsx             # Routes
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── vitest.config.js
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── database/           # SQLAlchemy configuration and sessions
│   │   ├── models/             # Users, conversations, messages, chat schemas
│   │   ├── routes/             # Authentication, conversations, demo chat, health checks
│   │   ├── schemas/            # Request and response validation
│   │   ├── security/           # Passwords, JWTs, authentication, origin checks
│   │   └── main.py
│   ├── migrations/             # Alembic migration history
│   ├── tests/                  # Isolated API integration tests
│   ├── alembic.ini
│   ├── pytest.ini
│   ├── requirements.txt
│   └── requirements-test.txt
├── docs/                       # Placeholder for future documentation
├── package.json                # Combined development commands
└── README.md
```

## 🚀 Getting started

### Prerequisites

The commands below use a macOS/Linux shell.

- **Node.js 24.15 or newer in the 24.x series**, with npm, is the recommended baseline for the current frontend and test dependencies. This project was verified with Node 24.21.0.
- **Python 3.11 or newer**, with pip and venv support. The current backend dependencies require at least Python 3.11; verification used Python 3.13.7.
- A running **PostgreSQL** server, a database role that can create a development database, and the `createdb` client utility for the example below.
- Git.

### 1. Get the project and install dependencies

```bash
git clone https://github.com/ojaskaushik/CarePath.git
cd CarePath
npm ci
npm ci --prefix frontend
python3 -m venv backend/.venv
backend/.venv/bin/python -m pip install -r backend/requirements.txt
```

The npm lockfiles are committed. `npm ci` installs their recorded dependency versions, including the frontend development/test tools.

### 2. Create a development database

With PostgreSQL running and your local database role configured:

```bash
createdb -h localhost -U YOUR_DB_USER carepath
```

Replace `YOUR_DB_USER` with your local PostgreSQL role. The command may prompt for its password. The database name `carepath` is an example; if you choose another name, use it in `DATABASE_URL` too. Skip creation if the intended database already exists.

### 3. Configure environment variables

Create `backend/.env` with your own values:

```dotenv
DATABASE_URL=postgresql+psycopg://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/carepath
JWT_SECRET_KEY=YOUR_GENERATED_SECRET
```

These are placeholders, not usable credentials. Set the actual host, port, role, password, and database for your installation. URL-encode special characters in the database username or password.

Generate a random authentication secret locally:

```bash
backend/.venv/bin/python -c "import secrets; print(secrets.token_urlsafe(48))"
```

Paste the generated value into `JWT_SECRET_KEY`. Backend configuration loads `backend/.env`; values already exported in the environment take precedence. Never commit real credentials or secrets. Environment files are ignored by Git, and no `.env.example` is currently provided.

All frontend API requests share [apiConfig.js](frontend/src/services/apiConfig.js). The default backend address is `http://localhost:8000`. To override it, create `frontend/.env.local`:

```dotenv
VITE_API_BASE_URL=http://localhost:8000
```

Use a base URL without a trailing slash, and restart Vite after changing it. `VITE_` values are exposed to the browser and must not contain secrets. Vite reads them at startup/build time.

**Deployment is not configured by this variable alone.** Backend CORS and conversation-mutation origin checks currently allow only `http://localhost:5173` and `http://127.0.0.1:5173`; session cookies also use development settings. Changing hosts or deploying requires coordinated backend configuration and HTTPS work.

### 4. Apply database migrations

From the repository root:

```bash
cd backend
.venv/bin/python -m alembic upgrade head
.venv/bin/python -m alembic current
cd ..
```

Alembic reads `DATABASE_URL` through the backend configuration. The migrations create `users`, `conversations`, and `messages`; the current head is `c68f7c4d8cac`. Inspect your target database URL before applying migrations. Starting the API does not automatically create tables or run migrations.

### 5. Start development servers

From the repository root:

```bash
npm run dev
```

This starts both services. Alternatively, use two terminals from the repository root:

```bash
npm run dev:backend
```

```bash
npm run dev:frontend
```

| Service | Default address |
|---|---|
| Frontend | http://localhost:5173 |
| Health Library | http://localhost:5173/health-library |
| Backend | http://localhost:8000 |
| Interactive API documentation | http://localhost:8000/docs |

Keep Vite on port 5173 for the current origin checks. Stop the servers with **Ctrl+C**.

## Testing and quality checks

### Frontend

```bash
cd frontend
npm test
npm run lint
npm run build
cd ..
```

- `npm test` runs the permanent Health Library suite with Vitest, jsdom, and Testing Library.
- Tests cover all six topics, filtering, empty results, Clear Search and focus, article routes, invalid slugs, article sections, source links, disclaimers, guest access, navigation, and page-title behavior.
- `npm run lint` runs Oxlint.
- `npm run build` creates the production frontend in `frontend/dist/`.
- `npm run preview` can serve that build locally; it is not a production deployment command.

The tests render real React components in jsdom and mock backend access where needed. They do not establish real-browser layout, screen-reader compatibility, external-source availability, medical accuracy, or clinical approval.

### Backend

From the repository root, following the [backend documentation](backend/README.md):

```bash
backend/.venv/bin/python -m pip install -r backend/requirements-test.txt
backend/.venv/bin/python -m pytest -c backend/pytest.ini
```

Alternatively, activate the backend virtual environment and run `python -m pytest` from `backend/`.

Tests cover authentication, invalid/expired sessions, protected routes, conversation creation and persistence, renaming/deletion, ownership checks, approved origins, and whitespace validation.

Fixtures override `DATABASE_URL` and `JWT_SECRET_KEY` before importing the app. Each test uses a fresh in-memory SQLite database through an overridden database dependency; the default application engine is blocked from connecting. Tests do not modify development PostgreSQL or contact medical services. SQLite coverage does not validate PostgreSQL-specific behavior or Alembic migrations.

## API overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API welcome response |
| GET | `/health`, `/api/v1/health` | Basic service checks; no database readiness check |
| POST | `/api/v1/chat/` | Guest demonstration response |
| POST | `/api/v1/auth/signup` | Register an account |
| POST | `/api/v1/auth/login` | Create a session |
| POST | `/api/v1/auth/logout` | Clear the browser session cookie |
| GET | `/api/v1/auth/me` | Retrieve the authenticated profile |
| GET / POST | `/api/v1/conversations` | List / create owned conversations |
| GET / PATCH / DELETE | `/api/v1/conversations/{id}` | Retrieve / rename / delete an owned conversation |
| POST | `/api/v1/conversations/{id}/messages` | Save a message and preset demo reply |

Saved-conversation routes require authentication and enforce ownership. Conversation mutations also check the request's `Origin`. Browser authentication uses an HTTP-only cookie with a 30-minute lifetime. Logout clears that cookie; it does not revoke an already-issued JWT before expiry.

Example guest request body:

```json
{
  "message": "What can CarePath do?"
}
```

The reply is a fixed demonstration message, not an individualized health assessment. `/api/v1/health` reports API status; it does not serve Health Library articles.

## Project status and next steps

| Area | Status |
|---|---|
| Accounts, profile, saved conversations | Implemented |
| Guest chat | Implemented in demonstration mode |
| Six searchable, cited Health Library articles | Implemented; clinical review outstanding |
| Frontend and backend regression tests | Implemented |
| Pharmacy discovery | Interface preview only |
| Personalized guidance and medication integration | Under development |
| Manual browser, responsive-layout, and screen-reader validation | Outstanding |
| Production security, privacy readiness, deployment, and monitoring | Outstanding |

Priorities for future work:

1. Obtain qualified clinical review of educational content and warning-sign wording.
2. Complete browser, keyboard, screen-reader, and responsive-layout checks; decide route-change focus and scroll behavior.
3. Expand account/data controls, retention policies, authentication hardening, and automated CI checks.
4. Integrate reliable medication data and a live pharmacy provider.
5. Evaluate personalized guidance separately, with appropriate safety screening and validation.

## Privacy and medical disclaimer

CarePath provides **general educational information, not medical diagnosis or treatment**. It is not a substitute for advice from a qualified healthcare professional. The demonstration assistant does not provide personalized medical guidance, and the educational articles have not been clinically approved.

CarePath is a development project and is not ready for real patients' sensitive health information. Signed-in conversations are stored in the configured database and linked to the account; production privacy controls and retention policies are incomplete. **Do not enter sensitive personal health information into the development version.**

For medical concerns, consult a qualified healthcare professional. In a medical emergency in Canada, call **911**.

**CarePath — Your Health. Your Next Step.**
