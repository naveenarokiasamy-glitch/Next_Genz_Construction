
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

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125410.49349164139!2d78.61520135167085!3d10.805343966719922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ff2aecdad%3A0x6de02c3bedbbaea6!2sTiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1790002854657!5m2!1sen!2sin";

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
            <SectionHeading
              eyebrow="Reach Us"
              title="Contact Information"
            />

            <div className="contact-info__list">
              {CONTACT_INFO.map((item, i) => (
                <ScrollReveal
                  key={item.label}
                  type="up"
                  delay={i * 0.06}
                  className="contact-info__card"
                >
                  <item.icon size={20} />

                  <div>
                    <p className="contact-info__label">
                      {item.label}
                    </p>

                    <p className="contact-info__value">
                      {item.value}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Google Maps */}
            <ScrollReveal
              type="up"
              className="contact-map"
            >
              <iframe
                src={MAP_EMBED_URL}
                title="Google Maps location of Tiruchirappalli, Tamil Nadu"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </ScrollReveal>
          </div>

          <ScrollReveal
            type="up"
            className="contact-layout__form"
          >
            <h3>Send a Project Enquiry</h3>

            <p className="contact-layout__form-note">
              This form is not yet connected to a live inbox — it's
              structured and ready for backend/API integration.
            </p>

            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}