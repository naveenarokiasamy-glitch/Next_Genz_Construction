
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Projects & Interior", path: "/projects" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        mobileMenuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          ease: "power4.inOut",
        }
      );

      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".mobile-nav__link"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.25,
          ease: "power2.out",
        }
      );
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <NavLink
            to="/"
            className="navbar__brand"
            onClick={() => setIsMenuOpen(false)}
            aria-label="NextGenz Constructions Home"
          >
            <span className="navbar__brand-main">NextGenz</span>
            <span className="navbar__brand-sub">Constructions</span>
          </NavLink>

          <nav className="navbar__links" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `navbar__link ${
                    isActive ? "navbar__link--active" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="navbar__toggle"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        className={`mobile-nav ${
          isMenuOpen ? "mobile-nav--open" : ""
        }`}
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="mobile-nav__link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}