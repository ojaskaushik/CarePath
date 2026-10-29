from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.chat import router as chat_router
from app.routes.health import router as health_router

from app.routes.conversations import router as conversations_router

app = FastAPI(
    title="CarePath API",
    description="Backend API for the CarePath platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(health_router)
app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(conversations_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to the CarePath API",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
