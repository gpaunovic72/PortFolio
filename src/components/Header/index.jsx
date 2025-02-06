import { useState } from "react";
import Experiences from "../../../public/assets/icon-experiences.webp";
import Presentation from "../../../public/assets/icon-presentation.webp";
import Projets from "../../../public/assets/icon-projets.webp";
import "../Header/Header.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { id: "presentation", label: "Présentation", icon: Presentation },
    { id: "projets", label: "Projets", icon: Projets },
    { id: "experiences", label: "Expériences", icon: Experiences },
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
          {navLinks.map(({ id, label, icon }) => (
            <li key={id}>
              <img
                src={icon}
                alt={`Icône ${label}`}
                className="navbar__link--icon"
              />
              <a
                href={`#${id}`}
                className={`navbar__link--element ${
                  activeLink === id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveLink(id), closeMenu();
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
