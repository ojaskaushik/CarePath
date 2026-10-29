from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.conversation import Conversation
from app.models.message import Message
from app.models.user import User
from app.routes.chat import DEVELOPMENT_REPLY
from app.schemas.conversation import (
    ConversationCreate,
    ConversationDetail,
    ConversationResponse,
    ConversationUpdate,
)
from app.security.csrf import verify_csrf
from app.security.dependencies import get_current_user

router = APIRouter(
    prefix="/api/v1/conversations",
    tags=["Conversations"],
)


def get_owned_conversation(
    conversation_id: int,
    user: User,
    db: Session,
) -> Conversation:
    conversation = db.scalar(
        select(Conversation).where(
            Conversation.id == conversation_id,
            Conversation.user_id == user.id,
        )
    )

    if conversation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found",
        )

    return conversation


def get_conversation_detail(
    conversation: Conversation,
    db: Session,
) -> ConversationDetail:
    messages = db.scalars(
        select(Message)
        .where(Message.conversation_id == conversation.id)
        .order_by(Message.id)
    ).all()

    return ConversationDetail(
        id=conversation.id,
        user_id=conversation.user_id,
        title=conversation.title,
        created_at=conversation.created_at,
        updated_at=conversation.updated_at,
        messages=messages,
    )


@router.post(
    "",
    response_model=ConversationResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(verify_csrf)],
)
def create_conversation(
    data: ConversationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = Conversation(
        user_id=current_user.id,
        title=data.title.strip(),
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


@router.get(
    "",
    response_model=list[ConversationResponse],
)
def list_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(Conversation)
        .where(Conversation.user_id == current_user.id)
        .order_by(
            Conversation.updated_at.desc(),
            Conversation.id.desc(),
        )
    ).all()


@router.get(
    "/{conversation_id}",
    response_model=ConversationDetail,
)
def get_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = get_owned_conversation(
        conversation_id,
        current_user,
        db,
    )

    return get_conversation_detail(conversation, db)


@router.patch(
    "/{conversation_id}",
    response_model=ConversationResponse,
    dependencies=[Depends(verify_csrf)],
)
def rename_conversation(
    conversation_id: int,
    data: ConversationUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = get_owned_conversation(
        conversation_id,
        current_user,
        db,
    )

    title = data.title.strip()

    if not title:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Conversation title cannot be empty",
        )

    conversation.title = title
    conversation.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(conversation)

    return conversation


@router.delete(
    "/{conversation_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(verify_csrf)],
)
def delete_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = get_owned_conversation(
        conversation_id,
        current_user,
        db,
    )

    messages = db.scalars(
        select(Message).where(
            Message.conversation_id == conversation.id
        )
    ).all()

    for message in messages:
        db.delete(message)

    db.delete(conversation)
    db.commit()


@router.post(
    "/{conversation_id}/messages",
    response_model=ConversationDetail,
    dependencies=[Depends(verify_csrf)],
)
def send_conversation_message(
    conversation_id: int,
    data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = get_owned_conversation(
        conversation_id,
        current_user,
        db,
    )

    question = data.get("content")

    if not isinstance(question, str):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Message content is required",
        )

    question = question.strip()

    if not question or len(question) > 2000:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Message must contain between 1 and 2000 characters",
        )

    user_message = Message(
        conversation_id=conversation.id,
        role="user",
        content=question,
    )

    assistant_message = Message(
        conversation_id=conversation.id,
        role="assistant",
        content=DEVELOPMENT_REPLY,
    )

    db.add(user_message)
    db.add(assistant_message)

    if conversation.title == "New conversation":
        conversation.title = question[:100]

    conversation.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(conversation)

    return get_conversation_detail(conversation, db)
