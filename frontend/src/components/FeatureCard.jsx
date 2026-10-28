import { ArrowUpRight } from "lucide-react";
import "../styles/home.css";

const cardColors = {
  "bg-teal-50": "care-feature-teal",
  "bg-blue-50": "care-feature-blue",
  "bg-emerald-50": "care-feature-emerald",
  "bg-purple-50": "care-feature-purple",
  "bg-orange-50": "care-feature-orange",
  "bg-rose-50": "care-feature-rose",
};

const iconColors = {
  "text-teal-600": "care-icon-teal",
  "text-blue-600": "care-icon-blue",
  "text-emerald-600": "care-icon-emerald",
  "text-purple-600": "care-icon-purple",
  "text-orange-600": "care-icon-orange",
  "text-rose-600": "care-icon-rose",
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  iconColor,
}) {
  const backgroundClass = cardColors[color] || "care-feature-teal";
  const iconClass = iconColors[iconColor] || "care-icon-teal";

  return (
    <article className="care-feature-card">
      <div className={`care-feature-icon ${backgroundClass}`}>
        <Icon
          size={27}
          className={iconClass}
          strokeWidth={1.8}
        />
      </div>

      <h3 className="care-feature-title">{title}</h3>

      <p className="care-feature-description">
        {description}
      </p>

      <div className="care-feature-action">
        <span>Explore more</span>
        <ArrowUpRight size={17} />
      </div>
    </article>
  );
}
