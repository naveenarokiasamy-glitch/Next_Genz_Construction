import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import ContactForm from "../components/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import "./Contact.css";

const CONTACT_INFO = [
  { icon: Phone, label: "Phone", value: "[Business Phone]" },
  { icon: Mail, label: "Email", value: "[Business Email]" },
  { icon: MapPin, label: "Office", value: "[Office Address], Trichy, Tamil Nadu" },
  { icon: Clock, label: "Hours", value: "[Business Hours]" },
];

export default function Contact() {
  return (
    <>
      <HeroSection
        variant="compact"
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Tell us about your project and we'll follow up with next steps."
        backgroundImage="/assets/Contactus_01.png"
      />

      <section className="section section--light">
        <div className="container contact-layout">
          <div className="contact-layout__info">
            <SectionHeading eyebrow="Reach Us" title="Contact Information" />
            <div className="contact-info__list">
              {CONTACT_INFO.map((item, i) => (
                <ScrollReveal key={item.label} type="up" delay={i * 0.06} className="contact-info__card">
                  <item.icon size={20} />
                  <div>
                    <p className="contact-info__label">{item.label}</p>
                    <p className="contact-info__value">{item.value}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="contact-map-placeholder" role="img" aria-label="Map placeholder for NextGenz Constructions office location">
              <MapPin size={28} />
              <p>Map integration pending</p>
            </div>
          </div>

          <ScrollReveal type="up" className="contact-layout__form">
            <h3>Send a Project Enquiry</h3>
            <p className="contact-layout__form-note">
              This form is not yet connected to a live inbox — it's structured and ready
              for backend/API integration.
            </p>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}