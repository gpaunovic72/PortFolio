import { Edit, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useAllExperiences } from "../../../hooks/useAllExperiences";
import { supabase } from "../../../lib/supabase";
import ExperienceEditForm from "./ExperienceEditForm";
import ExperienceForm from "./ExperienceForm";
import "./ExperienceManager.scss";

export default function ExperienceManager({ onMessage }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingExperience, setEditingExperience] = useState(null);

  const { experiences, loading, error } = useAllExperiences(refreshTrigger);

  // Supprimer une expérience
  const handleDelete = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setRefreshTrigger((prev) => prev + 1);
      onMessage("Expérience supprimée avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      onMessage("Erreur lors de la suppression");
    }
  };

  const handleExperienceAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
    onMessage("Expérience ajoutée avec succès !");
  };

  // Modifier une expérience
  const handleUpdateExperience = async (experienceId, updates) => {
    try {
      const { error } = await supabase
        .from("experiences")
        .update(updates)
        .eq("id", experienceId);

      if (error) throw error;

      setRefreshTrigger((prev) => prev + 1);
      setEditingExperience(null);
      onMessage("Expérience mise à jour avec succès !");
    } catch (err) {
      onMessage(`Erreur: ${err.message}`);
    }
  };

  // Annuler l'édition
  const handleCancelEdit = () => {
    setEditingExperience(null);
  };

  return (
    <div className="experience-manager">
      <div className="section-header">
        <h2>Gestion des expériences</h2>
        <p>Gérez vos expériences professionnelles en développement</p>
      </div>

      {loading && <div className="loading">Chargement des expériences...</div>}

      {error && <div className="error">Erreur: {error}</div>}

      {!loading && !error && (
        <>
          <ExperienceForm onExperienceAdded={handleExperienceAdded} />

          {editingExperience && (
            <ExperienceEditForm
              experience={editingExperience}
              onSave={handleUpdateExperience}
              onCancel={handleCancelEdit}
            />
          )}

          <div className="experiences-list">
            <h3>Expériences actuelles ({experiences.length})</h3>

            {experiences.length === 0 ? (
              <div className="no-experiences">
                <p>Aucune expérience en développement pour le moment.</p>
                <p>Ajoutez votre première expérience ci-dessus !</p>
              </div>
            ) : (
              <div className="experiences-grid">
                {experiences.map((experience) => (
                  <div key={experience.id} className="experience-card">
                    <div
                      className="experience-color"
                      style={{ backgroundColor: experience.color }}
                    />
                    <div className="experience-content">
                      <h4>{experience.name}</h4>
                      <p className="company">{experience.company}</p>
                      <p className="dates">
                        {experience.periods && experience.periods.length > 0
                          ? `${new Date(
                              experience.periods[0].start_date
                            ).toLocaleDateString("fr-FR")} - ${new Date(
                              experience.periods[
                                experience.periods.length - 1
                              ].end_date
                            ).toLocaleDateString("fr-FR")}`
                          : `${new Date(
                              experience.start_date
                            ).toLocaleDateString("fr-FR")} - ${new Date(
                              experience.end_date
                            ).toLocaleDateString("fr-FR")}`}
                      </p>
                      <div className="experience-meta">
                        <span className="priority">
                          Priorité: {experience.priority}
                        </span>
                        {experience.is_dev_experience ? (
                          <span className="dev-badge">Dev</span>
                        ) : (
                          <span className="non-dev-badge">Autre</span>
                        )}
                      </div>
                    </div>
                    <div className="experience-actions">
                      <button
                        className="edit-btn"
                        onClick={() => setEditingExperience(experience)}
                        title="Modifier"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(experience.id)}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

ExperienceManager.propTypes = {
  onMessage: PropTypes.func.isRequired,
};
