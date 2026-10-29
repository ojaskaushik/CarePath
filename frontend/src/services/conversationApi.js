
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const CONVERSATIONS_URL = `${API_BASE_URL}/api/v1/conversations`;

async function apiRequest(path = "", options = {}) {
  const response = await fetch(`${CONVERSATIONS_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof data?.detail === "string"
        ? data.detail
        : "Something went wrong. Please try again.";

    throw new Error(message);
  }

  return data;
}

export function getConversations() {
  return apiRequest();
}

export function getConversation(conversationId) {
  return apiRequest(`/${conversationId}`);
}

export function createConversation(title = "New conversation") {
  return apiRequest("", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function sendConversationMessage(conversationId, content) {
  return apiRequest(`/${conversationId}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export function renameConversation(conversationId, title) {
  return apiRequest(`/${conversationId}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });
}

export function deleteConversation(conversationId) {
  return apiRequest(`/${conversationId}`, {
    method: "DELETE",
  });
}
