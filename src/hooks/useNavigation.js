import { useLocation, useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });

      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
      return;
    }

    scrollToSection(sectionId);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return { navigateToSection, scrollToSection };
};
