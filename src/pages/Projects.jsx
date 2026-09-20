import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import ProjectGallery from "../components/ProjectGallery";
import CTASection from "../components/CTASection";
import { interiorCategories } from "../data/projects";
import "./Projects.css";

export default function Projects() {
  return (
    <>
      <HeroSection
        variant="compact"
        eyebrow="Portfolio"
        title="Our Projects & Interior"
        subtitle="A look at the kind of construction and interior work NextGenz takes on."
        backgroundImage="/assets/hero-projects.jpg"
      />

      <section className="section section--dark projects-gallery-section">
  <div className="container">
    <SectionHeading
      eyebrow="Browse By Category"
      title="Project Gallery"
      subtitle="Filter by category, or view details on any project."
    />

    <p className="projects-sample-note">
      Sample projects are shown below for illustration until real project photography
      is added.
    </p>

    <ProjectGallery />
  </div>
</section>

      <section className="section section--light projects-interior">
        <div className="container">
          <SectionHeading
            eyebrow="Interiors"
            title="Interior Design Categories"
            subtitle="Our interior work spans these areas — see examples marked 'Interior' in the gallery above."
          />
          <div className="projects-interior__grid">
            {interiorCategories.map((cat, i) => (
              <ScrollReveal key={cat} type="up" delay={i * 0.06} className="projects-interior__item">
                <h4>{cat}</h4>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a Project in Mind?"
        subtitle="Share your requirements and we'll follow up with next steps."
        primaryCta={{ label: "Start Your Project", to: "/contact" }}
        secondaryCta={{ label: "See Pricing Plans", to: "/pricing" }}
      />
    </>
  );
}