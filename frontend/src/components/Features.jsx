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
    title: "Self-Care Guidance",
    description:
      "Explore practical, evidence-based self-care information for common health concerns.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Pill,
    title: "Medication Information",
    description:
      "Learn about over-the-counter medications, their purposes, and important precautions.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: MapPin,
    title: "Find Nearby Pharmacies",
    description:
      "Discover pharmacies in your area and explore convenient options for accessing health products.",
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
            What We Offer
          </span>

          <h2 className="care-features-title">
            Everything you need to
            <span>take the next step.</span>
          </h2>

          <p className="care-features-description">
            CarePath brings together helpful health information,
            medication resources, and pharmacy discovery in one
            convenient place.
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
