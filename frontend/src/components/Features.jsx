
import {
  HeartHandshake,
  Pill,
  MapPin,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

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
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
            What We Offer
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Everything you need to
            <span className="block text-teal-600">
              take the next step.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
            CarePath brings together helpful health information,
            medication resources, and pharmacy discovery in one
            convenient place.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
