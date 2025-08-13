import { Loader2, Plus, X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import "./ExperienceForm.scss";

export default function ExperienceForm({ onExperienceAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    start_date: "",
    end_date: "",
    color: "#7451EB",
    priority: 1,
    is_dev_experience: true,
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("experiences")
        .insert([formData])
        .select();

      if (error) throw error;

      setFormData({
        name: "",
        company: "",
        start_date: "",
        end_date: "",
        color: "#7451EB",
        priority: 1,
        is_dev_experience: true,
        description: "",
      });

      setIsOpen(false);
      onExperienceAdded(data[0]);
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="add-experience-btn">
          <Plus size={20} />
          Ajouter une expérience
        </button>
      )}

      {isOpen && (
        <div className="experience-form-overlay">
          <div className="experience-form">
            <div className="form-header">
              <h3>Ajouter une expérience</h3>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
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

              <div className="form-row">
                <div className="form-group">
                  <label>Date de début *</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date de fin *</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Description de l'expérience..."
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

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cancel-btn"
                >
                  Annuler
                </button>
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? <Loader2 className="animate-spin" /> : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

ExperienceForm.propTypes = {
  onExperienceAdded: PropTypes.func.isRequired,
};
