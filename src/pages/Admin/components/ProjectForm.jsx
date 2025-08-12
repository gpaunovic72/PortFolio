import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function ProjectForm({ data, onUpdate }) {
  const formVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        opacity: { duration: 0.2 },
        height: { duration: 0.3 },
        y: { duration: 0.3 },
      },
    },
  };

  return (
    <motion.div
      className="project-card__form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="form-field">
        <label>Titre :</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onUpdate({ ...data, title: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label>Description :</label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ ...data, description: e.target.value })}
          rows={4}
        />
      </div>
    </motion.div>
  );
}

ProjectForm.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
