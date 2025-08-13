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
      const dateA =
        a.periods && a.periods.length > 0
          ? new Date(a.periods[0].start_date)
          : new Date(a.start_date);
      const dateB =
        b.periods && b.periods.length > 0
          ? new Date(b.periods[0].start_date)
          : new Date(b.start_date);
      return dateB - dateA;
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
