import { useState } from "react";
import { Link } from "react-router-dom";
import Contact from "../../assets/icon-email.webp";
import Experiences from "../../assets/icon-experiences.webp";
import Presentation from "../../assets/icon-presentation.webp";
import Projets from "../../assets/icon-projets.webp";
import { useNavigation } from "../../hooks/useNavigation";
import "../Header/Header.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { navigateToSection } = useNavigation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    {
      href: "/",
      id: "presentation",
      label: "Présentation",
      icon: Presentation,
    },
    { href: "/#projects", id: "projects", label: "Projets", icon: Projets },
    {
      href: "/experience",
      id: "experiences",
      label: "Expériences",
      icon: Experiences,
    },
    { href: "/#contact", id: "contact", label: "Contact", icon: Contact },
  ];

  return (
    <header className="navbar">
      <button
        className={`navbar__burger ${isOpen ? "open" : ""}`}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span className="navbar__burger--line"></span>
        <span className="navbar__burger--line"></span>
        <span className="navbar__burger--line"></span>
      </button>
      <nav className={`navbar__link ${isOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map(({ href, id, label, icon }) => (
            <li key={id}>
              <img
                src={icon}
                alt={`Icône ${label}`}
                className="navbar__link--icon"
              />
              <Link
                to={href}
                className={`navbar__link--element ${
                  activeLink === id ? "active" : ""
                }`}
                onClick={(e) => {
                  if (href.startsWith("/#")) {
                    e.preventDefault();
                    setActiveLink(id);
                    closeMenu();
                    navigateToSection(id);
                  } else {
                    setActiveLink(id);
                    closeMenu();
                  }
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
