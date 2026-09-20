import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import { ShieldCheck, Gem, Users2, Lightbulb } from "lucide-react";
import "./About.css";

const CORE_VALUES = [
  { icon: ShieldCheck, title: "Integrity" },
  { icon: Gem, title: "Quality" },
  { icon: Users2, title: "Collaboration" },
  { icon: Lightbulb, title: "Innovation" },
];

const WORK_PROCESS = [
  { step: "01", title: "Understand", desc: "Discuss client requirements and expectations." },
  { step: "02", title: "Plan", desc: "Develop the project approach and design direction." },
  { step: "03", title: "Build", desc: "Execute the project with structured coordination." },
  { step: "04", title: "Deliver", desc: "Complete the work with attention to agreed requirements." },
];

export default function About() {
  return (
    <>
      <HeroSection
        variant="compact"
        eyebrow="About NextGenz"
        title="Who We Are"
        subtitle="A construction and interior company based in Trichy, Tamil Nadu, built around quality, transparency, and thoughtful design."
        backgroundImage="/assets/hero-about.jpg"
      />

      {/* Who We Are */}
      <section className="section section--light">
        <div className="container about-intro">
          <ScrollReveal type="up">
            <p>
              NextGenz Constructions provides construction, interior design, renovation,
              architecture/planning, and consultation services. We work directly with
              clients through each stage of a project, from early discussion through to
              handover, with a focus on clear communication and consistent quality.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section--dark">
        <div className="container about-mv__grid">
          <ScrollReveal type="up" className="about-mv__card">
            <span className="eyebrow">Mission</span>
            <p>
              To deliver thoughtfully planned construction and interior solutions that
              prioritize quality, transparency, and customer satisfaction.
            </p>
          </ScrollReveal>
          <ScrollReveal type="up" delay={0.1} className="about-mv__card">
            <span className="eyebrow">Vision</span>
            <p>
              To build a trusted construction brand recognized for modern design,
              responsible execution, and lasting value.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section--light">
        <div className="container">
          <SectionHeading eyebrow="What Guides Us" title="Core Values" />
          <div className="about-values__grid">
            {CORE_VALUES.map((value, i) => (
              <ScrollReveal key={value.title} type="scale" delay={i * 0.08} className="about-values__item">
                <value.icon size={30} strokeWidth={1.5} />
                <h4>{value.title}</h4>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section className="section section--dark">
        <div className="container">
          <SectionHeading eyebrow="How We Work" title="Our Work Process" />
          <div className="about-process">
            {WORK_PROCESS.map((item, i) => (
              <ScrollReveal key={item.step} type="up" delay={i * 0.1} className="about-process__item">
                <span className="about-process__step">{item.step}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}