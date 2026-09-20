import { Check } from "lucide-react";
import Button from "./Button";
import "./PricingCard.css";

export default function PricingCard({ plan }) {
  return (
    <div className={`pricing-card ${plan.highlighted ? "pricing-card--highlighted" : ""}`}>
      {plan.highlighted && <span className="pricing-card__badge">Most Requested</span>}

      <h3 className="pricing-card__name">{plan.name}</h3>
      <p className="pricing-card__tagline">{plan.tagline}</p>

      <div className="pricing-card__price">
        {plan.priceLabel && <span className="pricing-card__price-label">{plan.priceLabel}</span>}
        <span className="pricing-card__price-value">{plan.price}</span>
      </div>

      <ul className="pricing-card__features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <Check size={16} /> <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button to="/contact" variant={plan.highlighted ? "primary" : "outline"} className="pricing-card__cta">
        Request a Quote
      </Button>
    </div>
  );
}