import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Clock3,
  HeartPulse,
  MapPin,
  Navigation,
  ShieldCheck,
  Store,
} from "lucide-react";

import PharmacySearch from "../components/PharmacySearch";
import "../styles/pharmacies.css";

const benefits = [
  {
    icon: MapPin,
    title: "Search by Location",
    description:
      "Enter your city or postal code to begin finding pharmacies in your area.",
  },
  {
    icon: Clock3,
    title: "Explore Pharmacy Details",
    description:
      "We're working toward displaying verified pharmacy addresses, opening hours, and contact information.",
  },
  {
    icon: Store,
    title: "Discover Local Options",
    description:
      "Find convenient pharmacy locations and compare available information before visiting.",
  },
];

export default function Pharmacies() {
  const [searchedLocation, setSearchedLocation] = useState("");

  const handleSearch = (location) => {
    setSearchedLocation(location);
  };

  return (
    <main className="care-pharmacies-page">
      <section className="care-pharmacies-hero">
        <div className="care-pharmacies-glow care-pharmacies-glow-right" />
        <div className="care-pharmacies-glow care-pharmacies-glow-left" />

        <div className="care-pharmacies-hero-container">
          <span className="care-pharmacies-badge">
            <Navigation size={16} />
            Pharmacy Discovery
          </span>

          <h1 className="care-pharmacies-title">
            Find a Pharmacy
            <span>Near You.</span>
          </h1>

          <p className="care-pharmacies-intro">
            Discover local pharmacy options and access useful
            information to help you plan your next visit.
          </p>

          <PharmacySearch onSearch={handleSearch} />

          {searchedLocation && (
            <div
              role="status"
              className="care-pharmacies-search-result"
            >
              <div className="care-pharmacies-result-content">
                <div className="care-pharmacies-result-icon">
                  <MapPin size={23} />
                </div>

                <div>
                  <h2 className="care-pharmacies-result-title">
                    Search for {searchedLocation}
                  </h2>

                  <p className="care-pharmacies-result-description">
                    Live pharmacy listings are coming soon.
                    Location search is currently a preview,
                    so no pharmacy results have been retrieved.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="care-pharmacies-benefits">
        <div className="care-pharmacies-benefits-container">
          <div className="care-pharmacies-benefits-header">
            <h2 className="care-pharmacies-benefits-title">
              Pharmacy Information,
              <span> Made Simple.</span>
            </h2>

            <p className="care-pharmacies-benefits-description">
              We're building tools to make exploring nearby
              pharmacy options easier and more convenient.
            </p>
          </div>

          <div className="care-pharmacies-benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="care-pharmacies-benefit-card"
                >
                  <div className="care-pharmacies-benefit-icon">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  <h3 className="care-pharmacies-benefit-title">
                    {benefit.title}
                  </h3>

                  <p className="care-pharmacies-benefit-description">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="care-pharmacies-cta-section">
        <div className="care-pharmacies-cta">
          <HeartPulse
            size={38}
            className="care-pharmacies-cta-icon"
          />

          <h2 className="care-pharmacies-cta-title">
            Not sure where to start?
          </h2>

          <p className="care-pharmacies-cta-description">
            CarePath is building an accessible way to explore
            health information before deciding on your next step.
          </p>

          <Link
            to="/chat"
            className="care-pharmacies-cta-button"
          >
            Explore CarePath
            <ArrowRight size={19} />
          </Link>

          <p className="care-pharmacies-cta-disclaimer">
            <ShieldCheck size={15} />
            Educational information only. Not medical advice.
          </p>
        </div>
      </section>
    </main>
  );
}
