import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

export default function ServiceCard({ icon: Icon, title, description }) {
  return (
    <Link to="/contact" className="service-card">
      <div className="service-card__icon">
        <Icon size={26} strokeWidth={1.6} />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{description}</p>
      <span className="service-card__link">
        Enquire <ArrowUpRight size={16} />
      </span>
    </Link>
  );
}