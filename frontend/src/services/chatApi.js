
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function sendChatMessage(message) {
  const response = await fetch(`${API_BASE_URL}/api/v1/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Unable to send your message. Please try again.");
  }

  const data = await response.json();

  return data.reply;
}
