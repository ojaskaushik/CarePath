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

export default function HowItWorksPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#f8fbfa] px-6 py-24 sm:py-28">
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-5 py-2 text-sm font-semibold text-teal-700">
            <HeartPulse size={17} />
            Getting Started
          </span>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your Health Journey,
            <span className="mt-2 block text-teal-600">
              Made Simpler.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-500">
            CarePath is designed to make health information easier
            to explore, helping you understand your options and
            discover useful resources along the way.
          </p>

          <Link
            to="/chat"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-7 py-4 font-semibold text-white transition hover:bg-teal-700"
          >
            Try Guest Chat
            <ArrowRight size={19} />
          </Link>

          <p className="mt-4 text-xs text-slate-400">
            Chat currently operates in demonstration mode.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-teal-600">
              The CarePath Experience
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Four Steps Toward Better Understanding
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-500">
              Here's how CarePath is being designed to support
              your health-information journey.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="grid gap-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:shadow-lg md:grid-cols-[100px_1fr] md:p-10"
                >
                  <div className="flex items-start gap-4 md:flex-col">
                    <span className="text-4xl font-extrabold text-teal-100">
                      {step.number}
                    </span>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                      <Icon size={27} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-4 max-w-3xl leading-relaxed text-slate-500">
                      {step.description}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {step.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >
                          <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0 text-teal-500"
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

      <section className="bg-[#f8fbfa] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Built Around You
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Simple access, clear information, and a
              privacy-conscious experience.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <UserRound size={30} className="mb-6 text-teal-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Guest-First Access
              </h3>
              <p className="mt-3 leading-relaxed text-slate-500">
                Explore the demonstration chat without creating
                an account. Saving conversations will require
                signing in when accounts become available.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <ShieldCheck size={30} className="mb-6 text-teal-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Privacy-Conscious Design
              </h3>
              <p className="mt-3 leading-relaxed text-slate-500">
                Guest conversations aren't saved to an account.
                We're developing additional privacy controls
                before introducing persistent chat history.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <BookOpen size={30} className="mb-6 text-teal-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Educational Focus
              </h3>
              <p className="mt-3 leading-relaxed text-slate-500">
                CarePath is intended to provide general health
                education, not replace qualified medical advice,
                diagnosis, or emergency services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-slate-900 px-8 py-16 text-center text-white sm:px-14">
          <HeartPulse
            size={40}
            className="mx-auto mb-7 text-teal-400"
          />

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Explore CarePath?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-300">
            Experience our guest conversation interface
            and discover what we're building.
          </p>

          <Link
            to="/chat"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-teal-500 px-7 py-4 font-semibold text-white transition hover:bg-teal-600"
          >
            Get Started
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>

      <div className="border-t border-slate-100 px-6 py-6">
        <p className="mx-auto flex max-w-5xl items-center justify-center gap-2 text-center text-xs text-slate-400">
          <ShieldCheck size={15} className="shrink-0" />
          CarePath provides educational information only and
          does not replace professional medical care.
        </p>
      </div>
    </main>
  );
}
