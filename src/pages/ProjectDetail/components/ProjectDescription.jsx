import PropTypes from "prop-types";

export default function ProjectDescription({ project }) {
  return (
    <div className="project-description">
      <h3>À propos du projet</h3>
      <div className="description-text">
        {project?.description?.split("\n\n").map((paragraph, index) => (
          <p key={index} className="paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

ProjectDescription.propTypes = {
  project: PropTypes.object,
};
