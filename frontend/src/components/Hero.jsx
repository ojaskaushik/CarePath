
import { useState } from "react";
import {
  ArrowRight,
  HeartPulse,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const examples = [
  "I have a cough",
  "I have a headache",
  "My throat hurts",
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      setMessage("Please describe how you're feeling.");
      return;
    }

    setMessage(
      "Your question is ready! Symptom guidance is coming soon."
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white px-6 pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-52 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-5 py-2 text-sm font-medium text-teal-700 shadow-sm">
          <Sparkles size={16} />
          A simpler way to explore your health
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          Your Health.
          <span className="mt-2 block bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
            Your Next Step.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          Have a health question? Explore reliable information,
          discover self-care options, and find pharmacies near you.
          No account required to get started.
        </p>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-12 max-w-2xl rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-teal-900/5"
        >
          <label htmlFor="symptom-search" className="sr-only">
            Describe your health concern
          </label>

          <div className="flex items-center gap-3">
            <Search className="ml-3 shrink-0 text-teal-600" size={24} />

            <input
              id="symptom-search"
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setMessage("");
              }}
              placeholder="Describe how you're feeling..."
              className="min-w-0 flex-1 bg-transparent py-4 text-base text-slate-800 outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-teal-600 px-5 py-4 font-semibold text-white transition hover:bg-teal-700"
            >
              <span className="hidden sm:inline">Explore</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        {message && (
          <p
            role="status"
            className="mx-auto mt-4 max-w-xl text-sm font-medium text-teal-700"
          >
            {message}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-slate-500">
            Try asking:
          </span>

          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setQuery(example);
                setMessage("");
              }}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-teal-300 hover:text-teal-700"
            >
              {example}
            </button>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <ShieldCheck size={19} className="text-teal-600" />
            Privacy-conscious
          </span>

          <span className="flex items-center gap-2">
            <HeartPulse size={19} className="text-teal-600" />
            Health information
          </span>

          <span className="flex items-center gap-2">
            <Sparkles size={19} className="text-teal-600" />
            No signup required
          </span>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-slate-400">
          CarePath provides educational information, not medical
          diagnosis or treatment. If you are experiencing a medical
          emergency, call 911 in Canada.
        </p>
      </div>
    </section>
  );
}
