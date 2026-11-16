import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Search, ShieldCheck } from "lucide-react";

import { healthTopics } from "../data/healthTopics";
import "../styles/health-library.css";

export default function HealthLibrary() {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const matchingTopics = healthTopics.filter((topic) =>
    [topic.name, topic.description, ...topic.keywords].some((text) =>
      text.toLowerCase().includes(search)
    )
  );

  return (
    <main className="care-library-page">
      <div className="care-library-container">
        <header className="care-library-header">
          <span className="care-library-badge">
            <BookOpen size={18} aria-hidden="true" />
            Health Information
          </span>
          <h1>Health Library</h1>
          <p>
            Explore common health topics. This is a preview of the library;
            topic articles and source links will be available in a future update.
          </p>
        </header>

        <div className="care-library-search">
          <label htmlFor="health-topic-search">Search health topics</label>
          <div className="care-library-search-field">
            <Search size={21} aria-hidden="true" />
            <input
              id="health-topic-search"
              type="search"
              placeholder="Try a topic or keyword, such as pollen"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-describedby="health-topic-results"
            />
          </div>
        </div>

        <p id="health-topic-results" className="care-library-results" role="status">
          {matchingTopics.length} {matchingTopics.length === 1 ? "topic" : "topics"} found
        </p>

        {matchingTopics.length > 0 ? (
          <div className="care-library-grid">
            {matchingTopics.map((topic) => (
              <Link
                key={topic.slug}
                to={`/health-library/${topic.slug}`}
                className="care-library-card"
              >
                <span className="care-library-card-icon">
                  <BookOpen size={24} aria-hidden="true" />
                </span>
                <h2>{topic.name}</h2>
                <p>{topic.description}</p>
                <span className="care-library-card-action">
                  Article coming soon
                  <ArrowRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="care-library-empty">
            <Search size={30} aria-hidden="true" />
            <h2>No topics found</h2>
            <p>Try another topic or keyword, or clear your search to see all topics.</p>
            <button type="button" onClick={() => setQuery("")}>
              Clear search
            </button>
          </div>
        )}

        <aside className="care-library-disclaimer" aria-label="Medical disclaimer">
          <ShieldCheck size={20} aria-hidden="true" />
          <p>
            General educational information only, not a diagnosis or personal
            treatment plan. Speak with a qualified healthcare professional about
            your situation.
          </p>
        </aside>
      </div>
    </main>
  );
}
