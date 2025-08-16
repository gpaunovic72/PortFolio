import { ExternalLink } from "lucide-react";
import PropTypes from "prop-types";

export default function ProjectActions({ project }) {
  return (
    (project?.github_link || project?.live_link) && (
      <div className="project-actions">
        {project?.github_link && (
          <a
            href={project?.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-visit-site"
          >
            <span>Voir le code</span>
            <ExternalLink size={16} />
          </a>
        )}
        {project?.live_link && (
          <a
            href={project?.live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-visit-site"
          >
            <span>Voir le site</span>
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    )
  );
}

ProjectActions.propTypes = {
  project: PropTypes.object,
};
