import PropTypes from "prop-types";
import "./ExperienceTimeline.scss";

export default function ExperienceTimeline({ experiences, onExperienceClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      month: "short",
      year: "numeric",
    });
  };

  const getDateRange = (experience) => {
    if (experience.periods && experience.periods.length > 0) {
      const firstPeriod = experience.periods[0];
      const lastPeriod = experience.periods[experience.periods.length - 1];
      return `${formatDate(firstPeriod.start_date)} - ${formatDate(
        lastPeriod.end_date
      )}`;
    }
    return `${formatDate(experience.start_date)} - ${formatDate(
      experience.end_date
    )}`;
  };

  const getCurrentPeriod = (experience) => {
    return experience.name;
  };

  const getCompanyName = (experience) => {
    return experience.company;
  };

  return (
    <div className="experience-timeline">
      {experiences.map((experience, index) => (
        <div key={experience.id} className="timeline-item">
          {/* Ligne de connexion */}
          {index < experiences.length - 1 && (
            <div className="timeline-connector" />
          )}

          {/* Point de la timeline */}
          <div
            className="timeline-dot"
            style={{ backgroundColor: experience.color }}
          />

          {/* Contenu de l'expérience */}
          <div className="experience-content">
            <div className="experience-header">
              <div className="experience-info">
                <h3 className="experience-title">
                  {getCurrentPeriod(experience)}
                </h3>
                <p className="company-name">{getCompanyName(experience)}</p>
                <p className="date-range">{getDateRange(experience)}</p>
              </div>

              <div className="experience-badge">
                {experience.is_dev_experience ? (
                  <span className="dev-badge">Développement</span>
                ) : (
                  <span className="other-badge">Autre</span>
                )}
              </div>
            </div>

            {experience.stacks && experience.stacks.length > 0 && (
              <div className="experience-technologies">
                {experience.stacks.map((stack, stackIndex) => (
                  <span
                    key={stackIndex}
                    className="tech-tag"
                    style={{
                      backgroundColor: stack.color,
                      color: "white",
                    }}
                  >
                    {stack.stack}
                  </span>
                ))}
              </div>
            )}

            <button
              className="view-details-btn"
              onClick={() => onExperienceClick(experience)}
            >
              Voir les détails
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

ExperienceTimeline.propTypes = {
  experiences: PropTypes.array.isRequired,
  onExperienceClick: PropTypes.func.isRequired,
};
