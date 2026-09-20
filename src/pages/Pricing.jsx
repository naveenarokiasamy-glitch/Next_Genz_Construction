import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import PricingCard from "../components/PricingCard";
import CTASection from "../components/CTASection";
import { pricingPlans } from "../data/pricing";
import "./Pricing.css";

export default function Pricing() {
  return (
    <>
      <HeroSection
        variant="compact"
        eyebrow="Pricing"
        title="Pricing Plans"
        subtitle="Proposed package concepts to give you a starting point — actual pricing is confirmed after a project discussion."
        backgroundImage="/assets/Pricing_01.png"
      />

      <section className="section section--dark">
        <div className="container">
          <SectionHeading
            eyebrow="Packages"
            title="Choose a Starting Point"
            subtitle="These are proposed package concepts only. Inclusions are editable and not yet confirmed business offerings."
          />
          <div className="pricing-grid">
            {pricingPlans.map((plan, i) => (
              <ScrollReveal key={plan.id} type="up" delay={i * 0.08}>
                <PricingCard plan={plan} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need a Custom Quote?"
        subtitle="Every project is different — tell us the details and we'll scope it with you directly."
        primaryCta={{ label: "Request a Quote", to: "/contact" }}
        secondaryCta={{ label: "View Our Projects", to: "/projects" }}
      />
    </>
  );
}