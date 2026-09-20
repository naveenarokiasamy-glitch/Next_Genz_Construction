import ScrollReveal from "./ScrollReveal";
import "./SectionHeading.css";

// align: "left" | "center"
export default function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && (
        <ScrollReveal type="fade">
          <span className="eyebrow">{eyebrow}</span>
        </ScrollReveal>
      )}
      <ScrollReveal type="mask" as="h2">
        {title}
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal type="up" delay={0.15}>
          <p className="section-heading__subtitle">{subtitle}</p>
        </ScrollReveal>
      )}
    </div>
  );
}