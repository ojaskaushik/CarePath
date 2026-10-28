import { MessageCircle, BookOpenCheck, MapPinned } from "lucide-react";
import "../styles/home.css";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Tell Us How You Feel",
    description:
      "Describe your health concern in your own words. No account is needed to get started.",
  },
  {
    number: "02",
    icon: BookOpenCheck,
    title: "Explore Helpful Information",
    description:
      "Review evidence-based self-care information, medication resources, and important safety guidance.",
  },
  {
    number: "03",
    icon: MapPinned,
    title: "Find Your Next Step",
    description:
      "Explore nearby pharmacies and find useful resources to help you decide what to do next.",
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
            Three simple steps to explore health information
            and discover useful resources.
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
