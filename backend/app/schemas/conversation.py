from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ConversationCreate(BaseModel):
    title: str = Field(
        default="New conversation",
        min_length=1,
        max_length=200,
    )


class ConversationUpdate(BaseModel):
    title: str = Field(
        min_length=1,
        max_length=200,
    )


class MessageCreate(BaseModel):
    role: str = Field(
        pattern="^(user|assistant)$",
    )
    content: str = Field(
        min_length=1,
        max_length=10000,
    )


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    conversation_id: int
    role: str
    content: str
    created_at: datetime


class ConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    title: str
    created_at: datetime
    updated_at: datetime


class ConversationDetail(ConversationResponse):
    messages: list[MessageResponse]
