import PropTypes from "prop-types";

export default function ProjectContent({ project }) {
  return (
    <div className="project-card__content">
      <p className="description">
        <strong>Description :</strong>
      </p>
      <p className="project-text">{project.description}</p>
      <p className="project-meta">
        <strong>Date :</strong> {project.date} | <strong>Images :</strong>{" "}
        {project.picture?.length || 0}
        {(project.github_link || project.live_link) && (
          <>
            <br />
            <strong>Liens :</strong> {project.github_link && "GitHub "}
            {project.github_link && project.live_link && "| "}
            {project.live_link && "Site"}
          </>
        )}
      </p>
    </div>
  );
}

ProjectContent.propTypes = {
  project: PropTypes.object.isRequired,
};
