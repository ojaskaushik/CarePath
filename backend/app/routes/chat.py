from fastapi import APIRouter, HTTPException, status

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
    if not request.message.strip():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Message cannot be empty",
        )

    return ChatResponse(
        reply=DEVELOPMENT_REPLY,
    )
