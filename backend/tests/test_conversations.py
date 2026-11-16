import pytest
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.message import Message
from app.routes.chat import DEVELOPMENT_REPLY

BASE = "/api/v1/conversations"


def test_create_and_retrieve_conversation(authenticated_client, conversation):
    client = authenticated_client
    assert conversation["title"] == "New conversation"
    assert client.get(BASE).json() == [conversation]
    detail = client.get(f"{BASE}/{conversation['id']}")
    assert detail.status_code == 200
    assert detail.json() == {**conversation, "messages": []}


def test_messages_are_saved_and_can_be_continued(authenticated_client, conversation):
    client = authenticated_client
    path = f"{BASE}/{conversation['id']}"
    response = client.post(f"{path}/messages", json={"content": " First question "})
    assert response.status_code == 200
    saved = response.json()
    assert saved["title"] == "First question"
    assert [m["role"] for m in saved["messages"]] == ["user", "assistant"]
    assert [m["content"] for m in saved["messages"]] == ["First question", DEVELOPMENT_REPLY]
    assert client.get(path).json() == saved

    continued = client.post(f"{path}/messages", json={"content": "Follow-up"})
    assert continued.status_code == 200
    messages = continued.json()["messages"]
    assert messages[:2] == saved["messages"]
    assert [m["content"] for m in messages[2:]] == ["Follow-up", DEVELOPMENT_REPLY]
    assert client.get(path).json()["messages"] == messages


def test_rename_and_delete_conversation(authenticated_client, conversation, db_engine):
    client = authenticated_client
    path = f"{BASE}/{conversation['id']}"
    assert client.post(f"{path}/messages", json={"content": "hello"}).status_code == 200
    renamed = client.patch(path, json={"title": " My chat "})
    assert renamed.status_code == 200
    assert renamed.json()["title"] == "My chat"
    assert client.get(path).json()["title"] == "My chat"
    assert client.delete(path).status_code == 204
    assert client.get(path).status_code == 404
    assert client.get(BASE).json() == []
    with Session(db_engine) as db:
        assert db.scalars(select(Message)).all() == []


@pytest.mark.parametrize("method,suffix,payload", [
    ("GET", "", None),
    ("POST", "/messages", {"content": "intrusion"}),
    ("PATCH", "", {"title": "intrusion"}),
    ("DELETE", "", None),
])
def test_other_user_cannot_access_conversation(
    client, conversation, register_and_login, method, suffix, payload
):
    path = f"{BASE}/{conversation['id']}"
    original = client.get(path).json()
    register_and_login("bob@example.com")
    assert client.get(BASE).json() == []
    response = client.request(method, path + suffix, json=payload)
    assert response.status_code == 404
    assert response.json()["detail"] == "Conversation not found"
    login = client.post(
        "/api/v1/auth/login",
        json={"email": "alice@example.com", "password": "test-password"},
    )
    assert login.status_code == 200
    assert client.get(path).json() == original


@pytest.mark.parametrize("origin", ["https://untrusted.example", None])
@pytest.mark.parametrize("method,suffix,payload", [
    ("POST", None, {}),
    ("POST", "/messages", {"content": "blocked"}),
    ("PATCH", "", {"title": "blocked"}),
    ("DELETE", "", None),
])
def test_conversation_mutations_require_approved_origin(
    authenticated_client, conversation, origin, method, suffix, payload
):
    client = authenticated_client
    path = f"{BASE}/{conversation['id']}"
    original = client.get(path).json()
    if origin is None:
        client.headers.pop("Origin")
    else:
        client.headers["Origin"] = origin
    response = client.request(method, BASE if suffix is None else path + suffix, json=payload)
    assert response.status_code == 403
    assert client.get(path).json() == original
    assert len(client.get(BASE).json()) == 1
