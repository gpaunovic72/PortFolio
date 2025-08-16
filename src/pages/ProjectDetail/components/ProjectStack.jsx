import PropTypes from "prop-types";

export default function ProjectStack({ project }) {
  return (
    <div className="project-stacks">
      <h3>Technologies utilisées</h3>
      <div className="stacks-grid">
        {project?.stacks?.map((stack, index) => (
          <div key={index} className="stack-item">
            <div
              className="stack-color"
              style={{ backgroundColor: stack.color }}
            />
            <span className="stack-name">{stack.stack}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

ProjectStack.propTypes = {
  project: PropTypes.object,
};
