import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Button from "./Button";
import "./HeroSection.css";

// variant: "full" (home, full viewport, big entrance) | "compact" (page header)
export default function HeroSection({
  variant = "full",
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage,
}) {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(bgRef.current, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power2.out" });

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current.querySelectorAll(".hero__title-line"),
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.12 },
          "-=1.4"
        );
      }

      tl.fromTo(
        heroRef.current.querySelectorAll(".hero__animate"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        "-=0.5"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <section
      ref={heroRef}
      className={`hero hero--${variant} ${!backgroundImage ? "hero--no-image" : ""}`}
    >
      <div className="hero__bg" ref={bgRef}>
        {backgroundImage && <img src={backgroundImage} alt="" />}
      </div>
      <div className="hero__scrim" />

      <div className="container hero__content">
        {eyebrow && <span className="eyebrow hero__animate">{eyebrow}</span>}

        <h1 className="hero__title" ref={titleRef}>
          {titleLines.map((line, i) => (
            <span className="hero__title-mask" key={i}>
              <span className="hero__title-line">{line}</span>
            </span>
          ))}
        </h1>

        {subtitle && <p className="hero__subtitle hero__animate">{subtitle}</p>}

        {(primaryCta || secondaryCta) && (
          <div className="hero__actions hero__animate">
            {primaryCta && (
              <Button to={primaryCta.to} variant="primary">
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button to={secondaryCta.to} variant="outline">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>

      {variant === "full" && (
        <div className="hero__scroll-cue hero__animate" aria-hidden="true">
          <span />
          <p>Scroll</p>
        </div>
      )}
    </section>
  );
}