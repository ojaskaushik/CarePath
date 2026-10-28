
import { MessageCircle, BookOpenCheck, MapPinned } from "lucide-react";

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
    <section className="bg-[#f8fbfa] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
            Simple & Accessible
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            How <span className="text-teal-600">CarePath</span> Works
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
            Three simple steps to explore health information
            and discover useful resources.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="absolute right-8 top-7 text-5xl font-extrabold text-slate-100">
                  {step.number}
                </span>

                <div className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                  <Icon size={29} strokeWidth={1.8} />
                </div>

                <h3 className="mb-4 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="leading-relaxed text-slate-500">
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
