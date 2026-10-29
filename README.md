# CarePath 🩺

### Your Health. Your Next Step.

**CarePath** is a full-stack healthcare information platform being built to make health resources easier to explore, understand, and access. The project brings together a conversational interface, personal accounts, saved conversation history, and a growing foundation for medication information and pharmacy discovery.

> 🚧 **Development status:** The React frontend, FastAPI backend, PostgreSQL-backed user accounts, and persistent conversation management are implemented. Personalized health guidance, live medication data, pharmacy search integration, and production security/privacy work are still in development.

## ✨ Features

### 💬 Conversations

- **Guest mode:** Ask questions without registering. Guest chats are temporary and are not saved to an account.
- **Signed-in mode:** Messages and the current development assistant response are saved automatically.
- **Conversation history:** Reopen and continue earlier conversations, even after refreshing the page.
- **Conversation management:** Start new chats, rename saved conversations, and delete conversations you no longer need.
- **Profile dashboard:** View saved conversations from a personalized account page.

**Current limitation:** CarePath returns a predefined demonstration response. It does **not** currently diagnose conditions or provide AI-generated, personalized medical guidance.

### 🔐 User Accounts

- User registration and login
- Password hashing and authenticated sessions
- Sign-out functionality
- Profile dashboard after login
- User-specific access controls for saved conversations

Authentication and persistence are working in the development environment; additional production hardening remains necessary.

### 🩺 Health Information — Planned

- Reviewed educational resources about common health concerns
- General self-care and safety information
- Guidance about when professional medical attention may be needed
- Reliable sources and clear medical disclaimers

### 💊 Medication Information — Planned

- General over-the-counter medication information
- Common uses, precautions, and safety considerations
- Potential integration with **Health Canada's Drug Product Database**

### 📍 Pharmacy Finder — Interface Implemented

- Responsive pharmacy-finder interface
- Planned city/postal-code search and verified pharmacy listings
- Planned location-provider integration for live results

### 📱 Responsive Design

- React-based interface for desktop and mobile
- Consistent navigation and account menus
- Reusable components, organized stylesheets, and Lucide icons

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript (JSX), Vite, React Router, Tailwind CSS, CSS, Lucide React |
| Backend | Python, FastAPI, Pydantic, Uvicorn |
| Data | PostgreSQL, SQLAlchemy |
| Authentication | Password hashing, JWT-based authentication, HTTP-only session cookies |
| Development | npm, Concurrently, Git, GitHub |

**Planned integrations:** Health Canada Drug Product Database and a pharmacy location/search provider.

## 📁 Project Structure

```text
CarePath/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/          # Navigation and reusable UI
│   │   ├── pages/               # Home, Chat, Profile, Login, Signup, etc.
│   │   ├── services/            # Authentication, chat, conversation APIs
│   │   ├── styles/              # Page and component styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── database/            # Database configuration and sessions
│   │   ├── models/              # User, conversation, and message models
│   │   ├── routes/              # Auth, chat, conversations, health
│   │   ├── schemas/             # Request and response schemas
│   │   ├── security/            # Authentication and request protections
│   │   └── main.py
│   └── requirements.txt
├── docs/
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Python 3.10 or newer
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd CarePath
```

Replace `<your-repository-url>` with the repository URL.

### 2. Install frontend dependencies

From the project root:

```bash
npm install
npm install --prefix frontend
```

### 3. Set up the Python backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..
```

### 4. Configure the development database

Set up a local PostgreSQL database and the backend's required environment variables, including its database connection and authentication secret. **Check the backend configuration for the exact variable names and database initialization procedure** before starting; these values are intentionally not included in this README.

Do not commit passwords, database credentials, session secrets, or `.env` files containing secrets.

### 5. Start CarePath

From the project root:

```bash
npm run dev
```

The root development command starts the frontend and backend together.

| Service | Local address |
|---|---|
| React frontend | http://localhost:5173 |
| FastAPI backend | http://localhost:8000 |
| API documentation | http://localhost:8000/docs |

Use **Ctrl+C** to stop the servers.

### 6. Build and lint the frontend

```bash
cd frontend
npm run build
npm run lint
```

## 🔌 API Overview

### General and guest chat

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API welcome response |
| GET | `/health` | Basic health check |
| GET | `/api/v1/health` | Versioned health check |
| POST | `/api/v1/chat/` | Guest/demo chat response |

### Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/v1/auth/signup` | Register a user |
| POST | `/api/v1/auth/login` | Log in |
| POST | `/api/v1/auth/logout` | Log out |
| GET | `/api/v1/auth/me` | Get the authenticated user |

### Saved conversations (authentication required)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/conversations` | List the current user's chats |
| POST | `/api/v1/conversations` | Create a conversation |
| GET | `/api/v1/conversations/{id}` | Retrieve a conversation and messages |
| PATCH | `/api/v1/conversations/{id}` | Rename a conversation |
| DELETE | `/api/v1/conversations/{id}` | Delete a conversation |
| POST | `/api/v1/conversations/{id}/messages` | Save a user message and demo reply |

Saved-conversation routes check ownership so users can access only their own conversations. The browser uses its authenticated session cookie when making these requests.

### Example guest chat request

```json
{
  "message": "I have a headache. What should I do?"
}
```

The current chat API responds with a **development message**, not an individualized health assessment.

## 📊 Development Progress

| Component | Status |
|---|---|
| React + Vite frontend | ✅ Implemented |
| Responsive navigation and account menu | ✅ Implemented |
| Home and How It Works pages | ✅ Implemented |
| Guest chat with FastAPI integration | ✅ Implemented |
| PostgreSQL database models | ✅ Implemented |
| Registration, login, and logout | ✅ Implemented |
| Authenticated sessions | ✅ Implemented |
| Automatic conversation saving | ✅ Implemented |
| Profile and conversation history dashboard | ✅ Implemented |
| Continue, rename, and delete conversations | ✅ Implemented |
| Pharmacy finder interface | ✅ Implemented |
| Live pharmacy search | 🚧 Planned |
| Reviewed health information | 🚧 Planned |
| Live OTC medication information | 🚧 Planned |
| Automated backend/integration test suite | 🚧 Planned |
| Production security and privacy readiness | 🚧 Planned |
| Deployment | 🚧 Planned |

## 🗺️ Roadmap

### Phase 1 — Frontend Foundation ✅

- [x] Initialize React and Vite
- [x] Build responsive navigation and core pages
- [x] Implement guest chat interface
- [x] Build login, signup, and pharmacy finder interfaces
- [x] Organize frontend components and styles

### Phase 2 — Backend Foundation ✅

- [x] Initialize FastAPI and versioned routes
- [x] Add request validation and guest chat endpoint
- [x] Connect frontend and backend
- [x] Configure local development startup

### Phase 3 — Database & Accounts 🚧

- [x] Integrate PostgreSQL and SQLAlchemy models
- [x] Implement registration, password hashing, and login/logout
- [x] Add authenticated conversation storage
- [x] Build profile and conversation history management
- [ ] Expand automated tests and account/privacy controls
- [ ] Harden authentication, cookies, CSRF protection, and deployment configuration

### Phase 4 — Health Information

- [ ] Create and review educational health resources
- [ ] Develop symptom intake and safety screening
- [ ] Integrate Canadian OTC medication data
- [ ] Add trustworthy citations and safety guidance

### Phase 5 — Pharmacy Discovery

- [ ] Connect a live pharmacy/location provider
- [ ] Add verified pharmacy details and location search
- [ ] Improve filters and search experience

### Phase 6 — Production Readiness

- [ ] Add automated backend and frontend tests
- [ ] Complete security, privacy, and data-retention reviews
- [ ] Configure production infrastructure and HTTPS
- [ ] Deploy and monitor the application

## 🔒 Privacy & Safety

CarePath is an **early-stage development project** and is not ready to store real patients' sensitive health information.

- Guest conversations are temporary and are not saved to an account.
- Signed-in conversations are stored in the development database and linked to the authenticated user.
- Authenticated routes enforce user-specific access to conversation history.
- Production-grade security, privacy controls, retention/deletion policies, and compliance reviews are not complete.
- **Do not enter sensitive personal health information into the development version.**

## ⚕️ Medical Disclaimer

CarePath is an educational software project, **not a medical device** and not a substitute for professional medical advice, diagnosis, or treatment. The current assistant uses a predefined demonstration response rather than personalized clinical guidance.

Consult a qualified healthcare professional for medical concerns. In a medical emergency in Canada, call **911**.

## 🌱 Project Vision

CarePath aims to bring health education, responsible self-care information, medication resources, and pharmacy discovery into one approachable experience. Development is incremental, with a focus on maintainable software, responsible health information, and user privacy.

**CarePath — Your Health. Your Next Step. 🩺**
