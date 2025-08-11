import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function ProjectContent({ project }) {
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.1 } },
  };

  return (
    <motion.div
      className="project-card__content"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="description">
        <strong>Description :</strong>
      </p>
      <p className="project-text">{project.description}</p>
      <p className="project-meta">
        <strong>Date :</strong> {project.date} | <strong>Images :</strong>{" "}
        {project.picture?.length || 0}
      </p>
    </motion.div>
  );
}

ProjectContent.propTypes = {
  project: PropTypes.object.isRequired,
};
