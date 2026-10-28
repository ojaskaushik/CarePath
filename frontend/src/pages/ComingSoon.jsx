import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";


export default function ComingSoon({
  title,
  description,
}) {
  return (
    <main className="mx-auto flex min-h-[75vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-3xl bg-teal-50 p-5 text-teal-600">
        <Construction size={36} />
      </div>

      <h1 className="mb-4 text-4xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mb-8 text-lg text-slate-500">
        {description}
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </main>
  );
}
