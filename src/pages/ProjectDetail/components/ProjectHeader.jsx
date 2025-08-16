import { ArrowLeft } from "lucide-react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function ProjectHeader({ project }) {
  return (
    <div className="project-header">
      <div className="container">
        <Link to="/" className="btn-back">
          <ArrowLeft size={16} />
          Retour
        </Link>
        <div className="project-meta">
          <h1>{project?.title || <Skeleton width={200} />}</h1>
          <div className="project-info">
            <span className="project-date">
              {project?.date || <Skeleton width={100} />}
            </span>
            <div className="project-stacks-preview">
              {project?.stacks?.map((stack, index) => (
                <span
                  key={index}
                  className="stack-preview"
                  style={{ backgroundColor: stack.color }}
                >
                  {stack.stack}
                </span>
              )) || <Skeleton width={80} count={3} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProjectHeader.propTypes = {
  project: PropTypes.object,
};
