import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowUp,
  HeartPulse,
  MessageCircle,
  Plus,
  Save,
  ShieldCheck,
} from "lucide-react";

import { sendChatMessage } from "../services/chatApi";
import "../styles/chat.css";

const STORAGE_KEY = "carepath-guest-chat";

const welcomeMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to CarePath! You can describe your health concern here. Our personalized health guidance feature is currently under development.",
};

function getInitialMessages(initialQuestion) {
  if (!initialQuestion) {
    return [welcomeMessage];
  }

  return [
    welcomeMessage,
    {
      id: crypto.randomUUID(),
      role: "user",
      content: initialQuestion,
    },
  ];
}

export default function Chat() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialQuestion =
    typeof location.state?.initialQuestion === "string"
      ? location.state.initialQuestion.trim().slice(0, 2000)
      : "";

  const [messages, setMessages] = useState(() =>
    getInitialMessages(initialQuestion)
  );

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(Boolean(initialQuestion));
  const [error, setError] = useState("");

  const requestVersion = useRef(0);
  const initialRequestStarted = useRef(false);

  useEffect(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Continue if browser storage is unavailable.
    }

    if (initialQuestion) {
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [initialQuestion, navigate, location.pathname]);

  useEffect(() => {
    if (!initialQuestion || initialRequestStarted.current) {
      return;
    }

    initialRequestStarted.current = true;

    const version = requestVersion.current;

    async function loadInitialResponse() {
      try {
        const reply = await sendChatMessage(initialQuestion);

        if (version !== requestVersion.current) {
          return;
        }

        setMessages((previous) => [
          ...previous,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: reply,
          },
        ]);
      } catch {
        if (version === requestVersion.current) {
          setError(
            "CarePath couldn't connect to the server. Please try again."
          );
        }
      } finally {
        if (version === requestVersion.current) {
          setIsSending(false);
        }
      }
    }

    loadInitialResponse();
  }, [initialQuestion]);

  const sendMessage = async (event) => {
    event.preventDefault();

    const question = input.trim();

    if (!question || isSending) return;

    const version = requestVersion.current;

    setInput("");
    setError("");
    setIsSending(true);

    setMessages((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: question,
      },
    ]);

    try {
      const reply = await sendChatMessage(question);

      if (version !== requestVersion.current) {
        return;
      }

      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      if (version === requestVersion.current) {
        setError(
          "CarePath couldn't connect to the server. Please try again."
        );
      }
    } finally {
      if (version === requestVersion.current) {
        setIsSending(false);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (input.trim() && !isSending) {
        event.currentTarget.form?.requestSubmit();
      }
    }
  };

  const newChat = () => {
    requestVersion.current += 1;

    setMessages([welcomeMessage]);
    setInput("");
    setError("");
    setIsSending(false);

    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  };

  return (
    <main className="care-chat-page">
      <div className="care-chat-container">
        <div className="care-chat-toolbar">
          <Link to="/" className="care-chat-back">
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="care-chat-actions">
            <button
              type="button"
              onClick={newChat}
              className="care-chat-new"
            >
              <Plus size={17} />
              New Chat
            </button>

            <Link to="/signup" className="care-chat-save">
              <Save size={17} />
              Save Chat
            </Link>
          </div>
        </div>

        <div className="care-chat-panel">
          <div className="care-chat-header">
            <div className="care-chat-header-icon">
              <HeartPulse size={25} />
            </div>

            <div>
              <h1 className="care-chat-heading">
                CarePath Assistant
              </h1>
              <p className="care-chat-session">
                Guest session · Not saved
              </p>
            </div>
          </div>

          <div
            aria-live="polite"
            className="care-chat-messages"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`care-chat-message-row ${
                  message.role === "user"
                    ? "care-chat-message-user"
                    : "care-chat-message-assistant"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="care-chat-avatar">
                    <MessageCircle size={19} />
                  </div>
                )}

                <div
                  className={`care-chat-bubble ${
                    message.role === "user"
                      ? "care-chat-bubble-user"
                      : "care-chat-bubble-assistant"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="care-chat-composer">
            <form
              onSubmit={sendMessage}
              className="care-chat-form"
            >
              <label
                htmlFor="chat-input"
                className="care-chat-sr-only"
              >
                Describe your health concern
              </label>

              <textarea
                id="chat-input"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Describe how you're feeling..."
                rows={2}
                maxLength={2000}
                className="care-chat-input"
              />

              <button
                type="submit"
                disabled={!input.trim() || isSending}
                aria-label="Send message"
                className="care-chat-send"
              >
                <ArrowUp size={20} />
              </button>
            </form>

            {isSending && (
              <p role="status" className="chat-status">
                CarePath is responding...
              </p>
            )}

            {error && (
              <p role="alert" className="chat-error">
                {error}
              </p>
            )}

            <p className="care-chat-disclaimer">
              <ShieldCheck size={14} />
              Educational information only. Not medical advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
