import pytest

from app.routes.chat import DEVELOPMENT_REPLY


@pytest.mark.parametrize("message", ["   ", "\t\n\r", "\u2003"])
def test_guest_chat_rejects_whitespace_only_messages(client, message):
    response = client.post("/api/v1/chat/", json={"message": message})
    assert response.status_code == 422
    assert response.json() == {"detail": "Message cannot be empty"}


@pytest.mark.parametrize("message", ["A health question", " \tA health question\n "])
def test_guest_chat_accepts_valid_messages(client, message):
    response = client.post("/api/v1/chat/", json={"message": message})
    assert response.status_code == 200
    assert response.json() == {"reply": DEVELOPMENT_REPLY, "status": "development"}
