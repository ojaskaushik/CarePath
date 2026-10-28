# CarePath 🩺

### Your Health. Your Next Step.

**CarePath** is a full-stack healthcare information platform designed to make reliable health resources more accessible, understandable, and convenient

From exploring common health concerns to learning about over-the-counter medications and discovering nearby pharmacies, CarePath aims to bring essential health information together in one user-friendly experience

The mission is simple: **help people better understand their options and take informed next steps toward managing their health**

> 🚧 **Development Status:** CarePath is actively under development — the frontend foundation, FastAPI backend foundation, and initial frontend-backend integration are complete, while database integration, authentication, and live health information services are upcoming

---

## ✨ Features

### 🩺 Health Information

- Explore common health concerns and symptoms
- Access evidence-based self-care resources
- Learn when professional medical attention may be necessary
- Understand general health and wellness information

**Status:** Planned — personalized health guidance and reviewed educational resources are not yet available

### 💬 Guest Conversations

- Start a conversation without creating an account
- Submit questions through a responsive chat interface
- Communicate with the Python FastAPI backend
- Start a new conversation at any time
- Access the chat directly or through the homepage
- Use the application without saving conversations to an account

**Current status:** The React chat interface is connected to FastAPI, with messages validated and processed through a REST API endpoint

The backend currently returns a fixed development response rather than personalized medical information

### 💊 Medication Information

- Explore over-the-counter medication information
- Understand common medication uses
- Learn about important precautions and safety considerations
- Access medication information from trustworthy sources

**Planned:** Integration with Health Canada's Drug Product Database

### 📍 Pharmacy Finder

- Search using a city or postal code
- Discover nearby pharmacy locations
- Explore pharmacy contact information and operating hours

**Current status:** The pharmacy finder interface is implemented, while live search results and location-provider integration are not yet available

### 🔐 Accounts & Conversation History

- Create a personal CarePath account
- Sign in securely
- Save and revisit conversations
- Manage conversation history

**Current status:** Login and signup interfaces are implemented, while authentication and persistent conversation storage are planned

### 📱 Responsive Design

- Modern, accessible interface
- Responsive layouts for desktop and mobile
- Consistent navigation across the application
- Reusable React components
- Organized CSS stylesheets
- Clean and intuitive user experience

---

## 🛠️ Tech Stack

### Frontend

- **React** — Component-based user interfaces
- **JavaScript (JSX)** — Frontend application logic
- **Vite** — Development server and production builds
- **Tailwind CSS** — Utility-based styling
- **CSS** — Component and page-specific stylesheets
- **React Router** — Client-side navigation
- **Lucide React** — Interface icons

### Backend

- **Python** — Backend programming language
- **FastAPI** — REST API framework
- **Pydantic** — Request and response validation
- **Uvicorn** — ASGI application server
- **CORS Middleware** — Controlled frontend-backend communication

### Development Tools

- **npm** — JavaScript package management
- **Concurrently** — Runs frontend and backend with one command
- **Git & GitHub** — Version control and project management

### Planned Technologies

- **PostgreSQL** — Database and persistent storage
- **Health Canada Drug Product Database** — Canadian medication information
- **Google Maps / Places API** — Pharmacy discovery and location information

---

## 📁 Project Structure

```text
CarePath/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── chatApi.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   └── chat.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── chat.py
│   │   │   └── health.py
│   │   ├── __init__.py
│   │   └── main.py
│   └── requirements.txt
│
├── docs/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

The frontend separates page components, reusable components, API services, and stylesheets, while the backend organizes API routes and data models into dedicated modules

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Python 3.10 or newer
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd CarePath
```

Replace `<your-repository-url>` with the actual GitHub repository URL

### 2. Install JavaScript Dependencies

From the project root:

```bash
npm install
npm install --prefix frontend
```

This installs the root development tools and frontend dependencies

### 3. Set Up the Python Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..
```

This creates a local Python virtual environment and installs the backend dependencies

### 4. Start CarePath

From the project root:

```bash
npm run dev
```

**One command starts both the React frontend and FastAPI backend**

| Service | Local Address |
|---|---|
| React frontend | http://localhost:5173 |
| FastAPI backend | http://127.0.0.1:8000 |
| API documentation | http://127.0.0.1:8000/docs |

The terminal displays separate backend and frontend logs

Press `Ctrl + C` to stop both servers

### 5. Build and Lint the Frontend

From the `frontend` directory:

```bash
npm run build
npm run lint
```

These commands verify the production build and check the frontend code for linting issues

---

## 🔌 API Endpoints

CarePath uses FastAPI to expose REST endpoints for frontend communication

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API welcome response |
| GET | `/health` | Basic backend health check |
| GET | `/api/v1/health` | Versioned health check |
| POST | `/api/v1/chat/` | Submit a chat message |

### Example Chat Request

**Endpoint:** `POST /api/v1/chat/`

```json
{
  "message": "I have a headache. What should I do?"
}
```

### Example Response

```json
{
  "reply": "Thanks for sharing your question. CarePath's personalized health guidance is still under development. This is currently a demonstration conversation, not a medical assessment. If your symptoms are severe, worsening, or concerning, contact a healthcare professional. For a medical emergency in Canada, call 911.",
  "status": "development"
}
```

Chat messages are validated using Pydantic, with a maximum message length of 2,000 characters

**Important:** The current chat endpoint returns a predefined development response — it does not provide diagnoses, personalized recommendations, or AI-generated medical guidance

---

## 📊 Development Progress

| Component | Status |
|---|---|
| Project structure | ✅ Complete |
| React and Vite setup | ✅ Complete |
| Responsive navigation | ✅ Implemented |
| Homepage | ✅ Implemented |
| How It Works page | ✅ Implemented |
| Guest chat interface | ✅ Implemented |
| Login interface | ✅ Implemented |
| Signup interface | ✅ Implemented |
| Pharmacy finder interface | ✅ Implemented |
| Organized CSS architecture | ✅ Implemented |
| FastAPI initialization | ✅ Complete |
| Versioned API routes | ✅ Implemented |
| Chat request validation | ✅ Implemented |
| Frontend-backend integration | ✅ Working |
| CORS configuration | ✅ Implemented |
| One-command development startup | ✅ Working |
| Frontend build and lint checks | ✅ Passed |
| Database integration | 🚧 Planned |
| Authentication system | 🚧 Planned |
| Saved conversation history | 🚧 Planned |
| Health information services | 🚧 Planned |
| OTC medication integration | 🚧 Planned |
| Live pharmacy discovery | 🚧 Planned |
| Production deployment | 🚧 Planned |

---

## 🗺️ Roadmap

### Phase 1 — Frontend Foundation

- [x] Initialize React and Vite
- [x] Configure Tailwind CSS
- [x] Build responsive navigation
- [x] Develop homepage
- [x] Create guest chat interface
- [x] Build login and signup pages
- [x] Build pharmacy finder interface
- [x] Create How It Works page
- [x] Organize frontend stylesheets
- [x] Implement responsive layouts

### Phase 2 — Backend Foundation

- [x] Initialize FastAPI
- [x] Organize versioned API routes
- [x] Create chat request and response models
- [x] Implement initial chat endpoint
- [x] Configure CORS middleware
- [x] Connect React chat to FastAPI
- [x] Add frontend API service
- [x] Configure one-command development startup
- [x] Verify frontend-backend communication
- [ ] Expand API validation and error handling
- [ ] Add automated backend tests

### Phase 3 — Database & User Accounts

- [ ] Configure PostgreSQL
- [ ] Create database models
- [ ] Implement secure user registration
- [ ] Add password hashing and authentication
- [ ] Implement login and logout
- [ ] Enable saved conversations
- [ ] Add conversation history management
- [ ] Implement privacy and account controls

### Phase 4 — Health Information

- [ ] Build a reviewed health-information resource library
- [ ] Develop symptom intake and safety screening
- [ ] Integrate Canadian OTC medication information
- [ ] Add reliable sources and safety notices
- [ ] Review health content for accuracy and safety

### Phase 5 — Pharmacy Discovery

- [ ] Integrate a pharmacy location provider
- [ ] Display verified pharmacy information
- [ ] Implement location-based searches
- [ ] Improve search and filtering

### Phase 6 — Deployment

- [ ] Configure production environments
- [ ] Implement automated testing
- [ ] Review security and privacy protections
- [ ] Deploy frontend and backend
- [ ] Monitor application reliability

---

## 🔒 Privacy & Safety

CarePath is being designed with privacy and responsible health information practices in mind

- Guest access does not require registration
- Guest conversations are currently maintained in temporary frontend application memory
- Guest messages are sent to the local FastAPI backend for processing
- The current chat endpoint does not intentionally persist conversation history
- Persistent conversation storage will require appropriate account and privacy controls
- Future health information features will prioritize trustworthy sources and clear safety guidance
- The application will not claim to diagnose medical conditions or replace healthcare professionals

**Please do not enter sensitive personal health information into the development version**

Production security, authentication, data retention, and privacy controls have not yet been completed

---

## ⚕️ Medical Disclaimer

CarePath is an educational software project and is not a medical device or a substitute for professional medical advice, diagnosis, or treatment

Information provided through CarePath should not be used as the sole basis for medical decisions

Always consult a qualified healthcare professional about medical concerns — in a medical emergency in Canada, call **911**

---

## 🌱 Project Vision

CarePath is more than a collection of health-related tools

The long-term vision is to create an accessible platform that connects health education, responsible self-care information, medication resources, and pharmacy discovery through a simple and intuitive experience

The project is being developed incrementally, with an emphasis on clean architecture, responsible health information, user privacy, and practical functionality

**CarePath — Your Health. Your Next Step. 🩺**
