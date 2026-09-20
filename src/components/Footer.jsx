import { NavLink } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import "./Footer.css";

const SITEMAP = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Projects & Interior", path: "/projects" },
  { label: "Pricing Plans", path: "/pricing" },
  { label: "Contact Us", path: "/contact" },
];

const SERVICES = [
  "House Construction",
  "Commercial Construction",
  "Interior Design",
  "Renovation",
  "Architecture / Planning",
  "Construction Consultation",
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <h3 className="footer__brand-name">NextGenz Constructions</h3>
          <p className="footer__tagline">
            Thoughtful design and reliable construction, built around your
            vision — based in Trichy, Tamil Nadu.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-heading">Sitemap</h4>
          <ul>
            {SITEMAP.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-heading">Services</h4>
          <ul>
            {SERVICES.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-heading">Get In Touch</h4>
          <ul className="footer__contact">
            <li>
              <MapPin size={16} /> <span>Trichy, Tamil Nadu — [Office Address]</span>
            </li>
            <li>
              <Phone size={16} /> <span>[Business Phone]</span>
            </li>
            <li>
              <Mail size={16} /> <span>[Business Email]</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} NextGenz Constructions. All rights reserved.</p>
          <p className="footer__note">Contact details shown are placeholders pending confirmation.</p>
        </div>
      </div>
    </footer>
  );
}