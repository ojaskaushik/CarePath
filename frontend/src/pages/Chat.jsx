import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

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
import {
  createConversation,
  getConversation,
  getConversations,
  sendConversationMessage,
} from "../services/conversationApi";
import {
  getCurrentUser,
  subscribeToAuth,
} from "../services/authSession";

import "../styles/chat.css";

const welcomeMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to CarePath! You can describe your health concern here. Our personalized health guidance feature is currently under development.",
};

function displayMessages(savedMessages) {
  return [
    welcomeMessage,
    ...savedMessages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
    })),
  ];
}

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const user = useSyncExternalStore(
    subscribeToAuth,
    getCurrentUser
  );

  const selectedConversation = searchParams.get("conversation");
  const startNew = location.state?.newChat === true;

  const initialQuestion =
    typeof location.state?.initialQuestion === "string"
      ? location.state.initialQuestion.trim().slice(0, 2000)
      : "";

  const [messages, setMessages] = useState([welcomeMessage]);
  const [conversationId, setConversationId] = useState(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(user));
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const requestVersion = useRef(0);
  const conversationIdRef = useRef(null);
  const sendingRef = useRef(false);
  const initialQuestionRef = useRef(null);

  useEffect(() => {
    const version = ++requestVersion.current;

    async function loadChat() {
      setError("");
      setSaveStatus("");
      setMessages([welcomeMessage]);
      setConversationId(null);
      conversationIdRef.current = null;
      sendingRef.current = false;
      setIsSending(false);

      if (!user) {
        setIsLoading(false);

        if (selectedConversation) {
          navigate("/login", { replace: true });
        }

        return;
      }

      if (startNew || initialQuestion) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        let id = selectedConversation;

        if (!id) {
          const conversations = await getConversations();

          if (version !== requestVersion.current) return;

          if (conversations.length === 0) {
            return;
          }

          id = conversations[0].id;
        }

        const conversation = await getConversation(id);

        if (version !== requestVersion.current) return;

        conversationIdRef.current = conversation.id;
        setConversationId(conversation.id);
        setMessages(displayMessages(conversation.messages));

        if (!selectedConversation) {
          navigate(`/chat?conversation=${conversation.id}`, {
            replace: true,
          });
        }
      } catch {
        if (version === requestVersion.current) {
          setError(
            "Unable to load this conversation. Please try again."
          );
        }
      } finally {
        if (version === requestVersion.current) {
          setIsLoading(false);
        }
      }
    }

    loadChat();

    return () => {
      requestVersion.current += 1;
    };
  }, [
    user,
    selectedConversation,
    startNew,
    initialQuestion,
    navigate,
  ]);

  useEffect(() => {
    if (
      !initialQuestion ||
      isLoading ||
      initialQuestionRef.current === initialQuestion
    ) {
      return;
    }

    initialQuestionRef.current = initialQuestion;

    async function sendInitialQuestion() {
      const version = requestVersion.current;

      sendingRef.current = true;
      setIsSending(true);
      setError("");

      setMessages([
        welcomeMessage,
        {
          id: crypto.randomUUID(),
          role: "user",
          content: initialQuestion,
        },
      ]);

      try {
        if (user) {
          const conversation = await createConversation();

          if (version !== requestVersion.current) return;

          conversationIdRef.current = conversation.id;
          setConversationId(conversation.id);

          const updated = await sendConversationMessage(
            conversation.id,
            initialQuestion
          );

          if (version !== requestVersion.current) return;

          setMessages(displayMessages(updated.messages));

          navigate(`/chat?conversation=${conversation.id}`, {
            replace: true,
            state: null,
          });
        } else {
          const reply = await sendChatMessage(initialQuestion);

          if (version !== requestVersion.current) return;

          setMessages((previous) => [
            ...previous,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: reply,
            },
          ]);

          navigate("/chat", {
            replace: true,
            state: null,
          });
        }
      } catch {
        if (version === requestVersion.current) {
          setError(
            "Unable to send your message. Please try again."
          );
          setInput(initialQuestion);
        }
      } finally {
        if (version === requestVersion.current) {
          sendingRef.current = false;
          setIsSending(false);
        }
      }
    }

    sendInitialQuestion();
  }, [initialQuestion, isLoading, user, navigate]);

  async function sendMessage(event) {
    event.preventDefault();

    const question = input.trim();

    if (!question || sendingRef.current || isLoading) return;

    const version = requestVersion.current;
    const temporaryId = crypto.randomUUID();

    sendingRef.current = true;
    setIsSending(true);
    setInput("");
    setError("");
    setSaveStatus("");

    setMessages((previous) => [
      ...previous,
      {
        id: temporaryId,
        role: "user",
        content: question,
      },
    ]);

    try {
      if (user) {
        let activeId = conversationIdRef.current;

        if (!activeId) {
          const conversation = await createConversation();

          if (version !== requestVersion.current) return;

          activeId = conversation.id;
          conversationIdRef.current = activeId;
          setConversationId(activeId);
        }

        const updated = await sendConversationMessage(
          activeId,
          question
        );

        if (version !== requestVersion.current) return;

        setMessages(displayMessages(updated.messages));
        setSaveStatus("Conversation saved automatically.");

        if (
          selectedConversation !== String(activeId)
        ) {
          navigate(`/chat?conversation=${activeId}`, {
            replace: true,
            state: null,
          });
        }
      } else {
        const reply = await sendChatMessage(question);

        if (version !== requestVersion.current) return;

        setMessages((previous) => [
          ...previous,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: reply,
          },
        ]);
      }
    } catch {
      if (version === requestVersion.current) {
        setError(
          "Unable to send or save your message. Please try again."
        );
        setInput(question);

        setMessages((previous) =>
          previous.filter(
            (message) => message.id !== temporaryId
          )
        );
      }
    } finally {
      if (version === requestVersion.current) {
        sendingRef.current = false;
        setIsSending(false);
      }
    }
  }

  function handleKeyDown(event) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (input.trim() && !isSending && !isLoading) {
        event.currentTarget.form?.requestSubmit();
      }
    }
  }

  function newChat() {
    requestVersion.current += 1;

    conversationIdRef.current = null;
    sendingRef.current = false;
    initialQuestionRef.current = null;

    setConversationId(null);
    setMessages([welcomeMessage]);
    setInput("");
    setError("");
    setSaveStatus("");
    setIsSending(false);
    setIsLoading(false);

    navigate("/chat", {
      replace: true,
      state: { newChat: true },
    });
  }

  function handleSaveChat() {
    if (!user) {
      navigate("/signup");
      return;
    }

    if (isSending) {
      setSaveStatus(
        "Your message is being saved. Please wait."
      );
      return;
    }

    if (!conversationId) {
      setSaveStatus(
        "Start a conversation first. Messages save automatically."
      );
      return;
    }

    setSaveStatus("Your conversation is saved to your account.");
  }

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
              disabled={isLoading || isSending}
            >
              <Plus size={17} />
              New Chat
            </button>

            <button
              type="button"
              onClick={handleSaveChat}
              className="care-chat-save"
            >
              <Save size={17} />
              Save Chat
            </button>
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
                {user
                  ? `Signed in as ${user.full_name} · Auto-save enabled`
                  : "Guest session · Not saved"}
              </p>
            </div>
          </div>

          <div aria-live="polite" className="care-chat-messages">
            {isLoading ? (
              <p className="chat-status">
                Loading your conversation...
              </p>
            ) : (
              messages.map((message) => (
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
              ))
            )}
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
                disabled={isSending || isLoading}
                className="care-chat-input"
              />

              <button
                type="submit"
                disabled={
                  !input.trim() || isSending || isLoading
                }
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

            {saveStatus && (
              <p role="status" className="chat-status">
                {saveStatus}
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
