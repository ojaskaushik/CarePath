import { Link } from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HeartPulse,
  MapPin,
  MessageCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import "../styles/how-it-works.css";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Tell Us How You're Feeling",
    description:
      "Start by describing your health concern in your own words. Whether it's a headache, cough, or another common concern, CarePath provides a simple place to begin.",
    details: [
      "No account required to get started",
      "Ask questions in everyday language",
      "Start a new conversation whenever you want",
    ],
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Explore Health Information",
    description:
      "Our goal is to help you understand common health concerns through accessible, evidence-based educational resources and appropriate safety guidance.",
    details: [
      "Understand common symptoms",
      "Explore general self-care information",
      "Recognize when professional care may be needed",
    ],
  },
  {
    number: "03",
    icon: HeartPulse,
    title: "Learn About OTC Medications",
    description:
      "Explore information about over-the-counter medications, including their common uses and important precautions, to support informed conversations with healthcare professionals.",
    details: [
      "Understand what different medications are used for",
      "Learn about general safety precautions",
      "Know when to ask a pharmacist or clinician",
    ],
  },
  {
    number: "04",
    icon: MapPin,
    title: "Find Nearby Pharmacies",
    description:
      "Search for pharmacies by city or postal code. As our pharmacy directory develops, you'll be able to explore location details and useful contact information.",
    details: [
      "Search using a Canadian city or postal code",
      "Explore pharmacy location information",
      "Plan your next pharmacy visit",
    ],
  },
];

const benefits = [
  {
    icon: UserRound,
    title: "Guest-First Access",
    description:
      "Explore the demonstration chat without creating an account. Saving conversations will require signing in when accounts become available.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-Conscious Design",
    description:
      "Guest conversations aren't saved to an account. We're developing additional privacy controls before introducing persistent chat history.",
  },
  {
    icon: BookOpen,
    title: "Educational Focus",
    description:
      "CarePath is intended to provide general health education, not replace qualified medical advice, diagnosis, or emergency services.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="care-how-page">
      <section className="care-how-hero">
        <div className="care-how-glow care-how-glow-right" />
        <div className="care-how-glow care-how-glow-left" />

        <div className="care-how-hero-container">
          <span className="care-how-badge">
            <HeartPulse size={17} />
            Getting Started
          </span>

          <h1 className="care-how-hero-title">
            Your Health Journey,
            <span>Made Simpler.</span>
          </h1>

          <p className="care-how-hero-description">
            CarePath is designed to make health information easier
            to explore, helping you understand your options and
            discover useful resources along the way.
          </p>

          <Link to="/chat" className="care-how-primary-button">
            Try Guest Chat
            <ArrowRight size={19} />
          </Link>

          <p className="care-how-demo-note">
            Chat currently operates in demonstration mode.
          </p>
        </div>
      </section>

      <section className="care-how-process">
        <div className="care-how-container">
          <div className="care-how-section-header">
            <span className="care-how-eyebrow">
              The CarePath Experience
            </span>

            <h2 className="care-how-section-title">
              Four Steps Toward Better Understanding
            </h2>

            <p className="care-how-section-description">
              Here's how CarePath is being designed to support
              your health-information journey.
            </p>
          </div>

          <div className="care-how-steps">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="care-how-step-card"
                >
                  <div className="care-how-step-visual">
                    <span className="care-how-step-number">
                      {step.number}
                    </span>

                    <div className="care-how-step-icon">
                      <Icon size={27} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div className="care-how-step-content">
                    <h3 className="care-how-step-title">
                      {step.title}
                    </h3>

                    <p className="care-how-step-description">
                      {step.description}
                    </p>

                    <div className="care-how-step-details">
                      {step.details.map((detail) => (
                        <div
                          key={detail}
                          className="care-how-step-detail"
                        >
                          <CheckCircle2
                            size={18}
                            className="care-how-check-icon"
                          />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="care-how-benefits">
        <div className="care-how-container">
          <div className="care-how-benefits-header">
            <h2 className="care-how-section-title">
              Built Around You
            </h2>

            <p className="care-how-section-description">
              Simple access, clear information, and a
              privacy-conscious experience.
            </p>
          </div>

          <div className="care-how-benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="care-how-benefit-card"
                >
                  <Icon
                    size={30}
                    className="care-how-benefit-icon"
                  />

                  <h3 className="care-how-benefit-title">
                    {benefit.title}
                  </h3>

                  <p className="care-how-benefit-description">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="care-how-cta-section">
        <div className="care-how-cta">
          <HeartPulse
            size={40}
            className="care-how-cta-icon"
          />

          <h2 className="care-how-cta-title">
            Ready to Explore CarePath?
          </h2>

          <p className="care-how-cta-description">
            Experience our guest conversation interface
            and discover what we're building.
          </p>

          <Link to="/chat" className="care-how-cta-button">
            Get Started
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>

      <div className="care-how-disclaimer">
        <p className="care-how-disclaimer-content">
          <ShieldCheck size={15} />
          CarePath provides educational information only and
          does not replace professional medical care.
        </p>
      </div>
    </main>
  );
}
