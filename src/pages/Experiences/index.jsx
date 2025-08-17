import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import DownloadPDFButton from "../../components/DownloadPDFButton";
import { useAllExperiences } from "../../hooks/useAllExperiences";
import ExperienceModal from "./components/ExperienceModal";
import ExperienceTimeline from "./components/ExperienceTimeline";
import "./Experiences.scss";

export default function Experiences() {
  const { experiences, loading, error } = useAllExperiences();
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Trier les expériences par date (plus récentes en premier)
  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      // Fonction pour obtenir la date la plus récente d'une expérience
      const getLatestDate = (experience) => {
        if (experience.periods && experience.periods.length > 0) {
          // Pour les périodes, prendre la date de fin de la dernière période
          const lastPeriod = experience.periods[experience.periods.length - 1];
          return new Date(lastPeriod.end_date);
        }
        // Pour les expériences simples, prendre la date de fin
        return new Date(experience.end_date || experience.start_date);
      };

      const dateA = getLatestDate(a);
      const dateB = getLatestDate(b);

      return dateB - dateA; // Plus récent en premier
    });
  }, [experiences]);

  const handleExperienceClick = (experience) => {
    setSelectedExperience(experience);
  };

  const handleModalClose = () => {
    setSelectedExperience(null);
  };

  // Animations variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const loadingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="experiences-page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      style={{ visibility: "hidden" }}
      onAnimationStart={() => {
        document.querySelector(".experiences-page").style.visibility =
          "visible";
      }}
    >
      {/* Header */}
      <motion.div className="experiences-header" variants={headerVariants}>
        <div className="header-content">
          <div className="header-text">
            <h1>Expériences Professionnelles</h1>
            <p>Mon parcours et mes réalisations techniques</p>
          </div>
          <DownloadPDFButton
            experiences={sortedExperiences}
            className="header-download-btn"
          />
        </div>
      </motion.div>

      {/* Timeline des expériences */}
      <motion.div className="experiences-content" variants={contentVariants}>
        {sortedExperiences.length > 0 && (
          <ExperienceTimeline
            experiences={sortedExperiences}
            onExperienceClick={handleExperienceClick}
          />
        )}
      </motion.div>

      {/* Modal pour les détails */}
      <AnimatePresence>
        {selectedExperience && (
          <ExperienceModal
            experience={selectedExperience}
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>

      {/* États de chargement et d'erreur */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-state"
            variants={loadingVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="loading-spinner"></div>
            <p>Chargement des expériences...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="error-state"
            variants={loadingVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p>Erreur: {error}</p>
          </motion.div>
        )}

        {!loading && !error && sortedExperiences.length === 0 && (
          <motion.div
            className="empty-state"
            variants={loadingVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p>Aucune expérience à afficher</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
