import PropTypes from "prop-types";
import "./TechnologyFilter.scss";

export default function TechnologyFilter({
  technologies,
  selectedTechnology,
  onTechnologyChange,
}) {
  return (
    <div className="technology-filter">
      <h2>Filtrer par technologie</h2>
      <div className="filter-buttons">
        <button
          className={`filter-btn ${
            selectedTechnology === "all" ? "active" : ""
          }`}
          onClick={() => onTechnologyChange("all")}
        >
          Toutes les technologies
        </button>

        {technologies.map((tech) => (
          <button
            key={tech}
            className={`filter-btn ${
              selectedTechnology === tech ? "active" : ""
            }`}
            onClick={() => onTechnologyChange(tech)}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
}

TechnologyFilter.propTypes = {
  technologies: PropTypes.array.isRequired,
  selectedTechnology: PropTypes.string.isRequired,
  onTechnologyChange: PropTypes.func.isRequired,
};
