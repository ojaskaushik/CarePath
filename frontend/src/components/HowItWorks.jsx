import { MessageCircle, BookOpenCheck, MapPinned } from "lucide-react";
import "../styles/home.css";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Try the Demo Chat",
    description:
      "Send a question and receive a preset demo response. Guest chats are temporary and need no account.",
  },
  {
    number: "02",
    icon: BookOpenCheck,
    title: "Save Your Conversations",
    description:
      "Create an account and sign in to save new conversations automatically.",
  },
  {
    number: "03",
    icon: MapPinned,
    title: "Manage Your History",
    description:
      "Reopen, continue, rename, or delete saved conversations from your profile.",
  },
];

export default function HowItWorks() {
  return (
    <section className="care-steps">
      <div className="care-steps-container">
        <div className="care-steps-header">
          <span className="care-steps-badge">
            Simple & Accessible
          </span>

          <h2 className="care-steps-title">
            How <span>CarePath</span> Works
          </h2>

          <p className="care-steps-description">
            Start a demo chat, save conversations when signed in,
            and return to them from your profile.
          </p>
        </div>

        <div className="care-steps-grid">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="care-step-card"
              >
                <span className="care-step-number">
                  {step.number}
                </span>

                <div className="care-step-icon">
                  <Icon size={29} strokeWidth={1.8} />
                </div>

                <h3 className="care-step-title">
                  {step.title}
                </h3>

                <p className="care-step-description">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
