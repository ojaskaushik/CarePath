
from fastapi import FastAPI

from app.routes.chat import router as chat_router
from app.routes.health import router as health_router

app = FastAPI(
    title="CarePath API",
    description="Backend API for the CarePath platform",
    version="0.1.0",
)

app.include_router(health_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to the CarePath API",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
