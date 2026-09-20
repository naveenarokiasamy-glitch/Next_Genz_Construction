import ScrollReveal from "./ScrollReveal";
import Button from "./Button";
import "./CTASection.css";

export default function CTASection({
  title = "Ready to Start Building?",
  subtitle = "Tell us about your project and we'll help you plan the next step.",
  primaryCta = { label: "Start Your Project", to: "/contact" },
  secondaryCta = { label: "Explore Our Projects", to: "/projects" },
}) {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner">
        <ScrollReveal type="up">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <div className="cta-banner__actions">
            <Button to={primaryCta.to} variant="primary">
              {primaryCta.label}
            </Button>
            <Button to={secondaryCta.to} variant="outline">
              {secondaryCta.label}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}