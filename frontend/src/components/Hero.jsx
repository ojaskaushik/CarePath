import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  HeartPulse,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "../styles/home.css";

const examples = [
  "I have a cough",
  "I have a headache",
  "My throat hurts",
];

export default function Hero() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      setMessage("Please describe how you're feeling.");
      return;
    }

    navigate("/chat", {
      state: { initialQuestion: query.trim() },
    });
  };

  return (
    <section className="care-hero">
      <div className="care-hero-glow care-hero-glow-right" />
      <div className="care-hero-glow care-hero-glow-left" />

      <div className="care-hero-container">
        <div className="care-hero-badge">
          <Sparkles size={16} />
          A simpler way to explore your health
        </div>

        <h1 className="care-hero-title">
          Your Health.
          <span>Your Next Step.</span>
        </h1>

        <p className="care-hero-description">
          Have a health question? Explore reliable information,
          discover self-care options, and find pharmacies near you.
          No account required to get started.
        </p>

        <form onSubmit={handleSearch} className="care-hero-search">
          <label htmlFor="symptom-search" className="care-sr-only">
            Describe your health concern
          </label>

          <div className="care-hero-search-content">
            <Search className="care-hero-search-icon" size={24} />

            <input
              id="symptom-search"
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setMessage("");
              }}
              placeholder="Describe how you're feeling..."
              className="care-hero-input"
            />

            <button type="submit" className="care-hero-submit">
              <span>Explore</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        {message && (
          <p role="status" className="care-hero-message">
            {message}
          </p>
        )}

        <div className="care-hero-examples">
          <span className="care-hero-examples-label">
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
              className="care-hero-example"
            >
              {example}
            </button>
          ))}
        </div>

        <div className="care-hero-benefits">
          <span>
            <ShieldCheck size={19} />
            Privacy-conscious
          </span>

          <span>
            <HeartPulse size={19} />
            Health information
          </span>

          <span>
            <Sparkles size={19} />
            No signup required
          </span>
        </div>

        <p className="care-hero-disclaimer">
          CarePath provides educational information, not medical
          diagnosis or treatment. If you are experiencing a medical
          emergency, call 911 in Canada.
        </p>
      </div>
    </section>
  );
}
