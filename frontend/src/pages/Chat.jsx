import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  ArrowLeft,
  ArrowUp,
  HeartPulse,
  MessageCircle,
  Plus,
  Save,
  ShieldCheck,
} from "lucide-react";

const STORAGE_KEY = "carepath-guest-chat";

const developmentResponse =
  "Thanks for sharing your question. CarePath's personalized health guidance is still under development. This is currently a demonstration conversation, not a medical assessment. If your symptoms are severe, worsening, or concerning, contact a healthcare professional. For a medical emergency in Canada, call 911.";

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
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: developmentResponse,
    },
  ];
}

export default function Chat() {
  const location = useLocation();

  const initialQuestion =
    typeof location.state?.initialQuestion === "string"
      ? location.state.initialQuestion.trim().slice(0, 2000)
      : "";

  const [messages, setMessages] = useState(() =>
    getInitialMessages(initialQuestion)
  );

  const [input, setInput] = useState("");

  useEffect(() => {
    // Remove guest chat data saved by the previous version.
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Continue if browser storage is unavailable.
    }

    // Clear the homepage question from navigation history.
    if (initialQuestion) {
      window.history.replaceState(
        { ...window.history.state, usr: null },
        "",
        window.location.pathname
      );
    }
  }, [initialQuestion]);

  const sendMessage = (event) => {
    event.preventDefault();

    const question = input.trim();

    if (!question) return;

    setMessages((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: question,
      },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: developmentResponse,
      },
    ]);

    setInput("");
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (input.trim()) {
        event.currentTarget.form?.requestSubmit();
      }
    }
  };

  const newChat = () => {
    setMessages([welcomeMessage]);
    setInput("");

    window.history.replaceState(
      { ...window.history.state, usr: null },
      "",
      window.location.pathname
    );
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f8fbfa]">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={newChat}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300"
            >
              <Plus size={17} />
              New Chat
            </button>

            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <Save size={17} />
              Save Chat
            </Link>
          </div>
        </div>

        <div className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-teal-900/5">
          <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <HeartPulse size={25} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                CarePath Assistant
              </h1>
              <p className="text-xs text-slate-500">
                Guest session · Not saved
              </p>
            </div>
          </div>

          <div
            aria-live="polite"
            className="flex flex-1 flex-col gap-6 px-5 py-8 sm:px-10"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <MessageCircle size={19} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-5 py-4 text-sm leading-relaxed sm:max-w-[75%] ${
                    message.role === "user"
                      ? "rounded-tr-sm bg-teal-600 text-white"
                      : "rounded-tl-sm bg-slate-100 text-slate-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 bg-white p-5 sm:p-7">
            <form
              onSubmit={sendMessage}
              className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 focus-within:border-teal-400"
            >
              <label htmlFor="chat-input" className="sr-only">
                Describe your health concern
              </label>

              <textarea
                id="chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe how you're feeling..."
                rows={2}
                maxLength={2000}
                className="max-h-40 min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp size={20} />
              </button>
            </form>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
              <ShieldCheck size={14} />
              Educational information only. Not medical advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
