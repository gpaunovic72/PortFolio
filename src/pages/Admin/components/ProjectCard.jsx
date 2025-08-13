import { motion } from "framer-motion";
import { Edit, Save, Trash2, X } from "lucide-react";
import PropTypes from "prop-types";
import ProjectImageManager from "../../../components/ProjectImageManager";
import "./ProjectCard.scss";
import ProjectContent from "./ProjectContent";
import ProjectForm from "./ProjectForm";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  isEditing,
  editingData,
  onSave,
  onCancel,
  onUpdateEditingData,
}) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        opacity: { duration: 0.3 },
        y: { duration: 0.4 },
        scale: { duration: 0.3 },
      },
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      {/* En-tête du projet */}
      <div className="project-card__header">
        <h3>
          {isEditing ? (
            <>
              <Edit
                size={16}
                style={{ marginRight: "4px", display: "inline" }}
              />
              Édition
            </>
          ) : (
            project.title
          )}
        </h3>
        <div className="project-card__actions">
          {isEditing ? (
            <>
              <button
                className="project-card__btn project-card__btn--cancel"
                onClick={onCancel}
              >
                <X size={14} style={{ marginRight: "4px" }} />
                Annuler
              </button>
              <button
                className="project-card__btn project-card__btn--save"
                onClick={() => onSave(project.id, editingData)}
              >
                <Save size={14} style={{ marginRight: "4px" }} />
                Sauvegarder
              </button>
            </>
          ) : (
            <>
              <button
                className="project-card__btn project-card__btn--edit"
                onClick={() =>
                  onEdit(project.id, {
                    title: project.title,
                    description: project.description,
                  })
                }
              >
                <Edit size={14} style={{ marginRight: "4px" }} />
                Modifier
              </button>
              <button
                className="project-card__btn project-card__btn--delete"
                onClick={() => onDelete(project.id)}
              >
                <Trash2 size={14} style={{ marginRight: "4px" }} />
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>

      {/* Contenu du projet */}
      <motion.div
        key={isEditing ? "editing" : "viewing"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isEditing ? (
          <ProjectForm data={editingData} onUpdate={onUpdateEditingData} />
        ) : (
          <ProjectContent project={project} />
        )}
      </motion.div>

      {/* Gestionnaire d'images intégré dans chaque carte */}
      <ProjectImageManager project={project} />
    </motion.div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editingData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdateEditingData: PropTypes.func.isRequired,
};
