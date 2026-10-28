
import { ArrowUpRight } from "lucide-react";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  iconColor,
}) {
  return (
    <article className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-900/5">
      <div
        className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
      >
        <Icon size={27} className={iconColor} strokeWidth={1.8} />
      </div>

      <h3 className="mb-3 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="leading-relaxed text-slate-500">
        {description}
      </p>

      <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-teal-600">
        <span>Explore more</span>
        <ArrowUpRight
          size={17}
          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </article>
  );
}
