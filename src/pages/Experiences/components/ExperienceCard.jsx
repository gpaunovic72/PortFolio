import PropTypes from "prop-types";
import "./ExperienceCard.scss";

export default function ExperienceCard({ experience, onClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      month: "short",
      year: "numeric",
    });
  };

  const getDateRange = () => {
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

  return (
    <div className="experience-card" onClick={() => onClick(experience)}>
      <div className="card-gradient" style={{ background: experience.color }} />

      <div className="card-content">
        <div className="card-header">
          <div className="experience-info">
            <h3 className="experience-name">{experience.company}</h3>
            <p className="company-name">{experience.name}</p>
            <p className="date-range">{getDateRange()}</p>
          </div>

          <div className="experience-badge">
            {experience.is_dev_experience ? (
              <span className="dev-badge">Développement</span>
            ) : (
              <span className="other-badge">Autre</span>
            )}
          </div>
        </div>

        {experience.description && (
          <div className="description-preview">
            <p>{experience.description}</p>
          </div>
        )}

        {experience.stacks && experience.stacks.length > 0 && (
          <div className="technologies-preview">
            {experience.stacks.slice(0, 3).map((stack, index) => (
              <span
                key={index}
                className="tech-chip"
                style={{
                  backgroundColor: stack.color,
                  color: "white",
                }}
              >
                {stack.stack}
              </span>
            ))}
            {experience.stacks.length > 3 && (
              <span className="more-techs">
                +{experience.stacks.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="card-overlay">
        <span className="view-details">Voir les détails</span>
      </div>
    </div>
  );
}

ExperienceCard.propTypes = {
  experience: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
