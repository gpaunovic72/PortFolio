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

  return (
    <div className="experiences-page">
      {/* Header */}
      <div className="experiences-header">
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
      </div>

      {/* Timeline des expériences */}
      <div className="experiences-content">
        {sortedExperiences.length > 0 && (
          <ExperienceTimeline
            experiences={sortedExperiences}
            onExperienceClick={handleExperienceClick}
          />
        )}
      </div>

      {/* Modal pour les détails */}
      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={handleModalClose}
        />
      )}

      {/* États de chargement et d'erreur */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Chargement des expériences...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>Erreur: {error}</p>
        </div>
      )}

      {!loading && !error && sortedExperiences.length === 0 && (
        <div className="empty-state">
          <p>Aucune expérience à afficher</p>
        </div>
      )}
    </div>
  );
}
