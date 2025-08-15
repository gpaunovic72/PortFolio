import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./ProjectForm.scss";

export default function ProjectForm({ data, onUpdate }) {
  const formVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const handleStackChange = (index, field, value) => {
    const newStacks = [...(data.stacks || [])];
    if (!newStacks[index]) {
      newStacks[index] = { color: "#1f6feb", stack: "" };
    }
    newStacks[index][field] = value;
    onUpdate({ ...data, stacks: newStacks });
  };

  const addStack = () => {
    const newStacks = [...(data.stacks || []), { color: "#1f6feb", stack: "" }];
    onUpdate({ ...data, stacks: newStacks });
  };

  const removeStack = (index) => {
    const newStacks = data.stacks?.filter((_, i) => i !== index) || [];
    onUpdate({ ...data, stacks: newStacks });
  };

  return (
    <motion.div
      className="project-card__form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="form-row">
        <div className="form-field">
          <label>Titre :</label>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => onUpdate({ ...data, title: e.target.value })}
            placeholder="Titre du projet"
          />
        </div>
        <div className="form-field">
          <label>Date :</label>
          <input
            type="text"
            value={data.date || ""}
            onChange={(e) => onUpdate({ ...data, date: e.target.value })}
            placeholder="ex: Janvier 2024"
          />
        </div>
      </div>

      <div className="form-field">
        <label>Description :</label>
        <textarea
          value={data.description || ""}
          onChange={(e) => onUpdate({ ...data, description: e.target.value })}
          rows={10}
          placeholder="Description du projet..."
        />
      </div>

      <div className="form-field">
        <label>Technologies :</label>
        <div className="stacks-container">
          {(data.stacks || []).map((stack, index) => (
            <div key={index} className="stack-item">
              <input
                type="color"
                value={stack.color || "#1f6feb"}
                onChange={(e) =>
                  handleStackChange(index, "color", e.target.value)
                }
                className="color-picker"
              />
              <input
                type="text"
                value={stack.stack || ""}
                onChange={(e) =>
                  handleStackChange(index, "stack", e.target.value)
                }
                placeholder="ex: React"
                className="stack-input"
              />
              <button
                type="button"
                onClick={() => removeStack(index)}
                className="remove-stack-btn"
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" onClick={addStack} className="add-stack-btn">
            + Ajouter une technologie
          </button>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>Lien GitHub :</label>
          <input
            type="text"
            value={data.github_link || ""}
            onChange={(e) => onUpdate({ ...data, github_link: e.target.value })}
            placeholder="https://github.com/username/repo"
          />
        </div>
        <div className="form-field">
          <label>Lien du site :</label>
          <input
            type="text"
            value={data.live_link || ""}
            onChange={(e) => onUpdate({ ...data, live_link: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
      </div>
    </motion.div>
  );
}

ProjectForm.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
