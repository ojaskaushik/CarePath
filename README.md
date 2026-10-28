# CarePath 🩺

### Your Health. Your Next Step.

CarePath is a full-stack healthcare information platform designed to make reliable health resources more accessible, understandable, and convenient.

From exploring common health concerns to learning about over-the-counter medications and discovering nearby pharmacies, CarePath aims to bring essential health information together in one user-friendly experience.

The goal is simple: **help people better understand their options and take informed next steps toward managing their health.**

> 🚧 **Development Status:** CarePath is actively being developed. The frontend foundation is complete, while backend services, authentication, and live health information integrations are upcoming.

---

## ✨ Features

### 🩺 Health Information
- Explore common health concerns and symptoms.
- Access evidence-based self-care resources.
- Learn when professional medical attention may be necessary.
- Understand general health and wellness information.

### 💬 Guest Conversations
- Start a conversation without creating an account.
- Enter health-related questions through a clean chat interface.
- Start new conversations at any time.
- Guest conversations are not saved to an account.

**Current status:** The chat interface is implemented, but personalized health guidance is not yet available. Responses currently indicate that the feature is under development.

### 💊 Medication Information
- Explore over-the-counter medication information.
- Understand common medication uses.
- Learn about important precautions and safety considerations.
- Access medication information from trusted sources.

**Planned:** Integration with Health Canada's Drug Product Database.

### 📍 Pharmacy Finder
- Search for pharmacies using a city or postal code.
- Discover nearby pharmacy locations.
- Explore pharmacy contact information and operating hours.

**Current status:** The pharmacy search interface is implemented. Live pharmacy results are not yet connected.

### 🔐 Accounts & Conversation History
- Create a personal CarePath account.
- Sign in securely.
- Save and revisit conversations.
- Manage saved conversation history.

**Current status:** Login and signup interfaces are implemented. Authentication and persistent storage are planned.

### 📱 Responsive Design
- Modern, accessible interface.
- Responsive layouts for desktop and mobile.
- Consistent navigation across the application.
- Clean, intuitive user experience.

---

## 🛠️ Tech Stack

### Frontend
- **React** — Component-based user interfaces
- **JavaScript (JSX)** — Frontend application logic
- **Vite** — Development server and build tooling
- **Tailwind CSS** — Responsive styling
- **React Router** — Client-side navigation
- **Lucide React** — Interface icons

### Backend
- **Python** — Backend programming language
- **FastAPI** — REST API framework

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
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   └── requirements.txt
│
├── docs/
├── .gitignore
└── README.md
```

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

Replace `<your-repository-url>` with the actual GitHub repository URL.

### 2. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal, typically:

`http://localhost:5173`

### 3. Run the Backend

Open a separate terminal from the project root.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

FastAPI's interactive API documentation is typically available at:

`http://127.0.0.1:8000/docs`

**Note:** The frontend and backend are not yet integrated.

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
| FastAPI initialization | ✅ Complete |
| Frontend-backend integration | 🚧 Planned |
| Authentication system | 🚧 Planned |
| Saved conversation history | 🚧 Planned |
| Health information services | 🚧 Planned |
| OTC medication integration | 🚧 Planned |
| Live pharmacy discovery | 🚧 Planned |
| Database integration | 🚧 Planned |

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

### Phase 2 — Backend Development
- [x] Initialize FastAPI
- [ ] Design REST API endpoints
- [ ] Connect frontend to backend
- [ ] Implement input validation and error handling
- [ ] Configure database models

### Phase 3 — User Accounts
- [ ] Implement secure registration and login
- [ ] Add password hashing and authentication
- [ ] Enable saved conversations
- [ ] Add conversation management
- [ ] Implement privacy and account controls

### Phase 4 — Health Information
- [ ] Build a reviewed health-information resource library
- [ ] Develop symptom intake and safety screening
- [ ] Integrate Canadian OTC medication information
- [ ] Add reliable sources and safety notices

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

CarePath is being designed with privacy and responsible health information practices in mind.

- Guest access does not require registration.
- Guest conversations are currently kept in temporary application memory.
- Persistent conversation storage will require appropriate account and privacy controls.
- Health information features will prioritize trustworthy sources and clear safety guidance.
- The application will not claim to diagnose medical conditions or replace healthcare professionals.

**Please do not enter sensitive personal health information into the development version.**

---

## ⚕️ Medical Disclaimer

CarePath is an educational software project and is not a medical device or a substitute for professional medical advice, diagnosis, or treatment.

Information provided through CarePath should not be used as the sole basis for medical decisions.

Always consult a qualified healthcare professional about medical concerns. In a medical emergency in Canada, call **911**.

---

## 🌱 Project Vision

CarePath is more than a collection of health-related tools.

The long-term vision is to create an accessible platform that connects health education, responsible self-care information, medication resources, and pharmacy discovery through a simple and intuitive experience.

**CarePath — Your Health. Your Next Step. 🩺**
