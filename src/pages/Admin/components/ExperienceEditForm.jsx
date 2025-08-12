import { motion } from "framer-motion";
import { Calendar, Save, X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import ExperiencePeriodsManager from "./ExperiencePeriodsManager";

export default function ExperienceEditForm({ experience, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: experience.name || "",
    company: experience.company || "",
    color: experience.color || "#7451EB",
    priority: experience.priority || 1,
    is_dev_experience: experience.is_dev_experience || true,
    periods: experience.periods || [],
    description: experience.description || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(experience.id, formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
      className="experience-edit-form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="form-header">
        <h3>
          <Calendar size={16} />
          Modifier l&apos;expérience
        </h3>
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            <X size={14} />
            Annuler
          </button>
          <button type="button" onClick={handleSubmit} className="save-btn">
            <Save size={14} />
            Sauvegarder
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nom de l&apos;expérience *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Entreprise *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Description de l'expérience..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Couleur</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Priorité</label>
            <input
              type="number"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              min="1"
              max="10"
            />
          </div>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="is_dev_experience"
              checked={formData.is_dev_experience}
              onChange={handleChange}
            />
            Expérience en développement
          </label>
        </div>

        {/* Gestionnaire de périodes d'intervention */}
        <ExperiencePeriodsManager
          periods={formData.periods}
          onPeriodsChange={(periods) => {
            setFormData((prev) => ({
              ...prev,
              periods,
            }));
          }}
        />
      </form>
    </motion.div>
  );
}

ExperienceEditForm.propTypes = {
  experience: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
