import { useEffect, useState, useSyncExternalStore } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  MessageSquare,
  Pencil,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  getConversations,
  renameConversation,
  deleteConversation,
} from "../services/conversationApi";

import {
  getCurrentUser,
  subscribeToAuth,
} from "../services/authSession";

import "../styles/profile.css";

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export default function Profile() {
  const navigate = useNavigate();
  const user = useSyncExternalStore(
    subscribeToAuth,
    getCurrentUser
  );

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    let active = true;

    async function loadConversations() {
      setLoading(true);
      setError("");

      try {
        const data = await getConversations();

        if (active) {
          setConversations(data);
        }
      } catch {
        if (active) {
          setError("Unable to load your conversations.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadConversations();

    return () => {
      active = false;
    };
  }, [user, navigate]);

  function startEditing(conversation) {
    setEditingId(conversation.id);
    setEditingTitle(conversation.title);
    setError("");
  }

  async function saveTitle(conversationId) {
    const title = editingTitle.trim();

    if (!title) {
      setError("Conversation title cannot be empty.");
      return;
    }

    setBusyId(conversationId);
    setError("");

    try {
      const updated = await renameConversation(
        conversationId,
        title
      );

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === conversationId
            ? updated
            : conversation
        )
      );

      setEditingId(null);
      setEditingTitle("");
    } catch {
      setError("Unable to rename the conversation.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(conversationId) {
    const confirmed = window.confirm(
      "Delete this conversation? This cannot be undone."
    );

    if (!confirmed) return;

    setBusyId(conversationId);
    setError("");

    try {
      await deleteConversation(conversationId);

      setConversations((previous) =>
        previous.filter(
          (conversation) => conversation.id !== conversationId
        )
      );
    } catch {
      setError("Unable to delete the conversation.");
    } finally {
      setBusyId(null);
    }
  }

  if (!user) return null;

  return (
    <main className="care-profile-page">
      <div className="care-profile-container">
        <div className="care-profile-intro">
          <div className="care-profile-avatar">
            <UserRound size={28} />
          </div>

          <div>
            <p className="care-profile-eyebrow">
              Your CarePath Account
            </p>

            <h1>Welcome back, {user.full_name}!</h1>

            <p>
              Manage your saved conversations and continue
              where you left off.
            </p>
          </div>
        </div>

        <section className="care-profile-section">
          <div className="care-profile-section-heading">
            <div>
              <h2>
                <MessageSquare size={23} />
                My Conversations
              </h2>

              <p>
                Your conversations are saved automatically.
              </p>
            </div>

            <Link
              to="/chat"
              state={{ newChat: true }}
              className="care-profile-new-button"
            >
              <Plus size={18} />
              New Chat
            </Link>
          </div>

          {error && (
            <p role="alert" className="care-profile-error">
              {error}
            </p>
          )}

          {loading ? (
            <div className="care-profile-empty">
              Loading your conversations...
            </div>
          ) : conversations.length === 0 ? (
            <div className="care-profile-empty">
              <MessageSquare size={38} />

              <h3>No conversations yet</h3>

              <p>
                Start a conversation with CarePath and it
                will appear here automatically.
              </p>

              <Link
                to="/chat"
                state={{ newChat: true }}
                className="care-profile-new-button"
              >
                <Plus size={18} />
                Start Your First Chat
              </Link>
            </div>
          ) : (
            <div className="care-profile-conversations">
              {conversations.map((conversation) => (
                <article
                  key={conversation.id}
                  className="care-profile-conversation"
                >
                  <div className="care-profile-conversation-icon">
                    <MessageSquare size={21} />
                  </div>

                  <div className="care-profile-conversation-details">
                    {editingId === conversation.id ? (
                      <form
                        className="care-profile-edit-form"
                        onSubmit={(event) => {
                          event.preventDefault();
                          saveTitle(conversation.id);
                        }}
                      >
                        <input
                          value={editingTitle}
                          onChange={(event) =>
                            setEditingTitle(event.target.value)
                          }
                          maxLength={200}
                          aria-label="Conversation title"
                          autoFocus
                        />

                        <button
                          type="submit"
                          disabled={busyId === conversation.id}
                        >
                          Save
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          disabled={busyId === conversation.id}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <h3>{conversation.title}</h3>
                    )}

                    <p className="care-profile-conversation-date">
                      <CalendarDays size={14} />
                      Updated {formatDate(conversation.updated_at)}
                    </p>
                  </div>

                  <div className="care-profile-conversation-actions">
                    <Link
                      to={`/chat?conversation=${conversation.id}`}
                      className="care-profile-continue"
                    >
                      Continue
                      <ArrowRight size={16} />
                    </Link>

                    <button
                      type="button"
                      aria-label={`Rename ${conversation.title}`}
                      title="Rename conversation"
                      onClick={() => startEditing(conversation)}
                      disabled={busyId === conversation.id}
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${conversation.title}`}
                      title="Delete conversation"
                      onClick={() => handleDelete(conversation.id)}
                      disabled={busyId === conversation.id}
                      className="care-profile-delete"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
