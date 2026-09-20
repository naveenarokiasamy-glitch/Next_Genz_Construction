import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import CTASection from "../components/CTASection";
import Button from "../components/Button";
import { services } from "../data/services";
import { projects } from "../data/projects";
import { ShieldCheck, MessageSquareText, Compass, Users } from "lucide-react";
import "./Home.css";

const WHY_CHOOSE_US = [
  { icon: ShieldCheck, title: "Quality-Focused Practices", desc: "Construction practices centered on quality at every stage of the build." },
  { icon: MessageSquareText, title: "Transparent Communication", desc: "Clear, ongoing communication through the life of your project." },
  { icon: Compass, title: "Thoughtful Design", desc: "Design decisions made around how the space will actually be used." },
  { icon: Users, title: "Customer-Centered Planning", desc: "Planning shaped around your priorities and project details." },
];

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <HeroSection
        variant="full"
        eyebrow="NextGenz Constructions — Trichy, Tamil Nadu"
        title={["Building Your Vision.", "Shaping Your Future."]}
        subtitle="At NextGenz Constructions, we bring together thoughtful design, reliable construction, and modern craftsmanship to create spaces built around your vision."
        primaryCta={{ label: "Start Your Project", to: "/contact" }}
        secondaryCta={{ label: "Explore Our Projects", to: "/projects" }}
        backgroundImage="/assets/hero-home.png"
      />

      {/* Brand Introduction */}
      <section className="section section--light home-intro">
        <div className="container home-intro__grid">
          <ScrollReveal type="mask" as="h2">Creating Spaces With Purpose.</ScrollReveal>
          <ScrollReveal type="up" delay={0.15}>
            <p>
              NextGenz Constructions provides construction, interior design, renovation,
              architecture/planning, and consultation services based in Trichy, Tamil Nadu.
              We work through each project methodically — from early planning to final
              handover — with an emphasis on quality and clear communication.
            </p>
          </ScrollReveal>
        </div>
      </section>

{/* Services Overview */}
<section className="section section--dark home-services">
  <div className="container">
    <SectionHeading
      eyebrow="What We Do"
      title="Services Built Around Your Project"
      subtitle="Six core services covering the full path from planning to finished space."
    />

    <div className="home-services__grid">
      {services.map((service, i) => (
        <ScrollReveal key={service.id} type="up" delay={i * 0.06}>
          <ServiceCard {...service} />
        </ScrollReveal>
      ))}
    </div>
  </div>
</section>

      {/* Featured Projects */}
      <section className="section section--light">
        <div className="container">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Projects"
            subtitle="A sample of the kind of work NextGenz takes on. Full portfolio on the Projects page."
          />
          <div className="home-projects__grid">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.id} type="scale" delay={i * 0.08} className="home-projects__item">
                <ProjectCard project={project} onView={() => {}} />
              </ScrollReveal>
            ))}
          </div>
          <div className="home-projects__more">
            <Button to="/projects" variant="ghost">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section--dark">
        <div className="container">
          <SectionHeading eyebrow="Why NextGenz" title="Why Choose NextGenz" />
          <div className="home-why__grid">
            {WHY_CHOOSE_US.map((item, i) => (
              <ScrollReveal key={item.title} type="up" delay={i * 0.08} className="home-why__item">
                <item.icon size={28} strokeWidth={1.5} />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}