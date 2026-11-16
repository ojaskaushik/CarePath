import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";

import { healthTopics } from "../data/healthTopics";
import "../styles/health-library.css";

export default function HealthTopic() {
  const { slug } = useParams();
  const topic = healthTopics.find((item) => item.slug === slug);

  return (
    <main className="care-library-page">
      <div className="care-library-container care-topic-container">
        <Link to="/health-library" className="care-topic-back">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Health Library
        </Link>

        {topic ? (
          <article className="care-topic-panel">
            <header className="care-library-header">
              <span className="care-library-badge">
                <BookOpen size={18} aria-hidden="true" />
                Health Library
              </span>
              <h1>{topic.name}</h1>
              <p>{topic.description}</p>
            </header>

            {topic.article ? (
              <>
                {topic.article.sections.map((section) => (
                  <section
                    key={section.id}
                    className="care-topic-section"
                    aria-labelledby={`topic-${section.id}`}
                  >
                    <h2 id={`topic-${section.id}`}>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items && (
                      <ul>
                        {section.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    )}
                    <p className="care-topic-citations">
                      Sources: {section.sourceIds.map((sourceId, index) => {
                        const source = topic.article.sources.find((item) => item.id === sourceId);
                        return (
                          <span key={sourceId}>
                            {index > 0 && "; "}
                            <a href={source.url}>{source.title} ({source.publisher})</a>
                          </span>
                        );
                      })}
                    </p>
                  </section>
                ))}
                <section className="care-topic-section" aria-labelledby="topic-sources">
                  <h2 id="topic-sources">Sources and further reading</h2>
                  <p>
                    Sources checked: <time dateTime={topic.article.sourcesChecked}>
                      {topic.article.sourcesChecked}
                    </time>. This records a source check, not a medical review.
                  </p>
                  <ul>
                    {topic.article.sources.map((source) => (
                      <li key={source.id}>
                        <a href={source.url} className="care-topic-source">
                          {source.title} — {source.publisher}
                          <ExternalLink size={16} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            ) : (
              <section aria-labelledby="topic-content-heading">
                <h2 id="topic-content-heading">About this topic</h2>
                <p>
                  Detailed educational content is being prepared. In the meantime,
                  visit the trusted source below to learn more about this topic.
                </p>
                <a
                  href={topic.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="care-topic-source"
                >
                  Read about {topic.name} on {new URL(topic.sourceUrl).hostname}
                  <ExternalLink size={16} aria-hidden="true" />
                  <span>(opens in a new tab)</span>
                </a>
              </section>
            )}
          </article>
        ) : (
          <div className="care-library-empty">
            <BookOpen size={30} aria-hidden="true" />
            <h1>Topic not found</h1>
            <p>
              We couldn't find that health topic. Use the link above to return
              to the library and explore the available topics.
            </p>
          </div>
        )}

        <aside className="care-library-disclaimer" aria-label="Medical disclaimer">
          <ShieldCheck size={20} aria-hidden="true" />
          <p>
            General educational information only, not a diagnosis or personalized
            treatment plan. Speak with a qualified healthcare professional about
            your situation.
          </p>
        </aside>
      </div>
    </main>
  );
}
