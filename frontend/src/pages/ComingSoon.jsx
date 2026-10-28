import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

import "../App.css";

export default function ComingSoon({ title, description }) {
  return (
    <main className="care-coming-soon">
      <div className="care-coming-soon-icon">
        <Construction size={36} />
      </div>

      <h1 className="care-coming-soon-title">
        {title}
      </h1>

      <p className="care-coming-soon-description">
        {description}
      </p>

      <Link
        to="/"
        className="care-coming-soon-button"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </main>
  );
}
