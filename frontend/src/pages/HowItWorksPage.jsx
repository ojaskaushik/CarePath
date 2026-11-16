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
      "Try a conversation in your own words. Chat currently returns a preset demo response, not personalized health guidance.",
    details: [
      "No account required to get started",
      "Ask questions in everyday language",
      "Start a new conversation whenever you want",
    ],
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Health Information — Planned",
    description:
      "Educational health resources and personalized guidance are still in development. The demo does not assess symptoms.",
    details: [
      "Planned: common symptom information",
      "Planned: general self-care resources",
      "Planned: guidance on seeking professional care",
    ],
  },
  {
    number: "03",
    icon: HeartPulse,
    title: "Medication Information — Planned",
    description:
      "Over-the-counter medication information is planned. Medication data and recommendations are not available yet.",
    details: [
      "Planned: common medication uses",
      "Planned: general safety precautions",
      "Planned: resources for discussions with a pharmacist",
    ],
  },
  {
    number: "04",
    icon: MapPin,
    title: "Pharmacy Search — Preview",
    description:
      "Try entering a city or postal code in the search preview. Live results and pharmacy details are not connected yet.",
    details: [
      "Available: location-entry preview",
      "Planned: live pharmacy listings",
      "Planned: addresses, hours, and contact details",
    ],
  },
];

const benefits = [
  {
    icon: UserRound,
    title: "Guest-First Access",
    description:
      "Try demo chat without an account. Create an account and sign in to save new conversations automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Manage Your Conversations",
    description:
      "Reopen, continue, rename, or delete saved chats from your profile. Guest chats are temporary and disappear on refresh.",
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
            Try demo chat without an account, or sign in to save
            and manage conversations. Health resources and live
            pharmacy discovery are still in development.
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
              Available Now and Coming Next
            </h2>

            <p className="care-how-section-description">
              Explore today's demo and the health-information
              features we're planning next.
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
          CarePath currently offers demo conversations and
          does not replace professional medical care.
        </p>
      </div>
    </main>
  );
}
