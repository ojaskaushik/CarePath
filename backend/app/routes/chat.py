from fastapi import APIRouter

from app.models.chat import ChatRequest, ChatResponse

router = APIRouter(
    prefix="/api/v1/chat",
    tags=["Chat"],
)

DEVELOPMENT_REPLY = (
    "Thanks for sharing your question. "
    "CarePath's personalized health guidance is still under development. "
    "This is currently a demonstration conversation, not a medical assessment. "
    "If your symptoms are severe, worsening, or concerning, "
    "contact a healthcare professional. "
    "For a medical emergency in Canada, call 911."
)


@router.post("/", response_model=ChatResponse)
def send_message(request: ChatRequest):
    return ChatResponse(
        reply=DEVELOPMENT_REPLY,
    )
