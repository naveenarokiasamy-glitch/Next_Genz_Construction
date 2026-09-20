// Reusable scroll-reveal wrapper. Wraps any content and animates it in
// via GSAP ScrollTrigger when it enters the viewport.
//
// Usage:
//   <ScrollReveal type="up"><h2>Heading</h2></ScrollReveal>
//   <ScrollReveal type="scale" delay={0.15}><ProjectCard ... /></ScrollReveal>
//
// type: "up" | "fade" | "scale" | "mask"

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = {
  up: { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
  fade: { from: { opacity: 0 }, to: { opacity: 1 } },
  scale: { from: { opacity: 0, scale: 0.92 }, to: { opacity: 1, scale: 1 } },
};

export default function ScrollReveal({
  children,
  type = "up",
  delay = 0,
  duration = 1,
  start = "top 82%",
  as: Tag = "div",
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      if (type === "mask") {
        const inner = el.firstElementChild;
        gsap.fromTo(
          inner,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: duration * 1.1,
            delay,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start },
          }
        );
        return;
      }

      const variant = VARIANTS[type] || VARIANTS.up;
      gsap.fromTo(el, variant.from, {
        ...variant.to,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start },
      });
    }, ref);

    return () => ctx.revert();
  }, [type, delay, duration, start]);

  return (
    <Tag ref={ref} className={`${type === "mask" ? "reveal-mask" : ""} ${className}`.trim()}>
      {type === "mask" ? <div>{children}</div> : children}
    </Tag>
  );
}