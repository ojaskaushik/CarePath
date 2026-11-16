import {
  HeartHandshake,
  Pill,
  MapPin,
} from "lucide-react";

import FeatureCard from "./FeatureCard";
import "../styles/home.css";

const features = [
  {
    icon: HeartHandshake,
    title: "Health Library",
    description:
      "Browse six source-backed articles: common cold, headaches, sore throat, seasonal allergies, dehydration, and constipation.",
    to: "/health-library",
    actionLabel: "Browse Health Library",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Pill,
    title: "Medication Information",
    description:
      "Planned: information about over-the-counter medications, their uses, and precautions.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: MapPin,
    title: "Find Nearby Pharmacies",
    description:
      "Try the search preview. Live pharmacy listings and location details are not available yet.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export default function Features() {
  return (
    <section className="care-features">
      <div className="care-features-container">
        <div className="care-features-header">
          <span className="care-features-badge">
            Explore CarePath
          </span>

          <h2 className="care-features-title">
            More ways to explore
            <span>health information.</span>
          </h2>

          <p className="care-features-description">
            Browse the Health Library or try demo chat and saved conversations.
            Personalized health guidance, medication integration, and live
            pharmacy discovery are still in development.
          </p>
        </div>

        <div className="care-features-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
