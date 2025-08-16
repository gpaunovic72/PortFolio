import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../ProjectButton/ProjectButton.scss";

export default function ProjectButton({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="btnProjects">
      Voir le projet
    </Link>
  );
}

ProjectButton.propTypes = {
  project: PropTypes.object.isRequired,
};
