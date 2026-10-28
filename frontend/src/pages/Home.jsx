
import { HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-3xl bg-teal-50 p-5 text-teal-600">
        <HeartPulse size={42} />
      </div>

      <h1 className="mb-5 text-5xl font-bold tracking-tight text-slate-900">
        Your Health,{" "}
        <span className="text-teal-600">Your Next Step.</span>
      </h1>

      <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
        Explore reliable health information, discover self-care
        options, and find pharmacies near you.
      </p>

      <p className="mt-8 text-sm text-slate-400">
        CarePath is under active development.
      </p>
    </main>
  );
}
