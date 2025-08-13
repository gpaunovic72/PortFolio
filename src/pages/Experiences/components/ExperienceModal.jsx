import PropTypes from "prop-types";
import "./ExperienceModal.scss";

export default function ExperienceModal({ experience, onClose }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDateRange = () => {
    if (experience.periods && experience.periods.length > 0) {
      return experience.periods.map((period, index) => (
        <span key={index} className="period-item">
          <strong>{period.description}</strong>
          <span className="period-dates">
            {formatDate(period.start_date)} - {formatDate(period.end_date)}
          </span>
          {index < experience.periods.length - 1 && <br />}
        </span>
      ));
    }
    return (
      <span className="period-item">
        {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
      </span>
    );
  };

  return (
    <div className="experience-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h2>{experience.name}</h2>
            <span className="company-subtitle">{experience.company}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="experience-details">
            <div className="detail-section">
              <h3>Période</h3>
              <div className="period-info">{getDateRange()}</div>
            </div>

            {experience.description && (
              <div className="detail-section">
                <h3>Description technique</h3>
                <p className="description-text">{experience.description}</p>
              </div>
            )}

            {experience.stacks && experience.stacks.length > 0 && (
              <div className="detail-section">
                <h3>Technologies utilisées</h3>
                <div className="technologies-grid">
                  {experience.stacks.map((stack, index) => (
                    <span
                      key={index}
                      className="tech-badge"
                      style={{
                        backgroundColor: stack.color,
                        color: "white",
                      }}
                    >
                      {stack.stack}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-section">
              <h3>Type d&apos;expérience</h3>
              <div className="experience-type">
                {experience.is_dev_experience ? (
                  <span className="type-badge dev">Développement</span>
                ) : (
                  <span className="type-badge other">Autre</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ExperienceModal.propTypes = {
  experience: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
