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
    <main className="min-h-screen bg-[#f8fbfa]">
      <section className="relative overflow-hidden px-6 pb-20 pt-24">
        <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-5 py-2 text-sm font-semibold text-teal-700">
            <Navigation size={16} />
            Pharmacy Discovery
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find a Pharmacy
            <span className="mt-2 block text-teal-600">
              Near You.
            </span>
          </h1>

          <p className="mx-auto mb-12 mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
            Discover local pharmacy options and access useful
            information to help you plan your next visit.
          </p>

          <PharmacySearch onSearch={handleSearch} />

          {searchedLocation && (
            <div
              role="status"
              className="mx-auto mt-8 max-w-3xl rounded-2xl border border-teal-100 bg-white p-7 text-left shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <MapPin size={23} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Search for {searchedLocation}
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
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

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pharmacy Information,
              <span className="text-teal-600"> Made Simple.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              We're building tools to make exploring nearby
              pharmacy options easier and more convenient.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-3xl border border-slate-100 bg-[#f8fbfa] p-8 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="leading-relaxed text-slate-500">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-slate-900 px-8 py-14 text-center text-white sm:px-14">
          <HeartPulse
            size={38}
            className="mx-auto mb-6 text-teal-400"
          />

          <h2 className="text-3xl font-bold sm:text-4xl">
            Not sure where to start?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-300">
            CarePath is building an accessible way to explore
            health information before deciding on your next step.
          </p>

          <Link
            to="/chat"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-500 px-7 py-4 font-semibold text-white transition hover:bg-teal-600"
          >
            Explore CarePath
            <ArrowRight size={19} />
          </Link>

          <p className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Educational information only. Not medical advice.
          </p>
        </div>
      </section>
    </main>
  );
}
