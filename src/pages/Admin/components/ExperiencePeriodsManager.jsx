import { Calendar, Edit, Plus, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import "./ExperiencePeriodsManager.scss";

export default function ExperiencePeriodsManager({
  periods = [],
  onPeriodsChange,
}) {
  const [isAddingPeriod, setIsAddingPeriod] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [newPeriod, setNewPeriod] = useState({
    start_date: "",
    end_date: "",
    description: "",
    priority: 1,
    project_id: null,
  });

  const handleAddPeriod = () => {
    if (
      !newPeriod.start_date ||
      !newPeriod.end_date ||
      !newPeriod.description
    ) {
      return;
    }

    const updatedPeriods = [...periods, { ...newPeriod, id: Date.now() }];
    onPeriodsChange(updatedPeriods);

    setNewPeriod({
      start_date: "",
      end_date: "",
      description: "",
      priority: 1,
      project_id: null,
    });
    setIsAddingPeriod(false);
  };

  const handleEditPeriod = (periodId) => {
    const period = periods.find((p) => p.id === periodId);
    if (period && !isAddingPeriod) {
      setEditingPeriod({ ...period });
      setIsAddingPeriod(true);
    }
  };

  const handleUpdatePeriod = () => {
    if (
      !editingPeriod.start_date ||
      !editingPeriod.end_date ||
      !editingPeriod.description
    ) {
      return;
    }

    const updatedPeriods = periods.map((p) =>
      p.id === editingPeriod.id ? editingPeriod : p
    );
    onPeriodsChange(updatedPeriods);

    setEditingPeriod(null);
    setIsAddingPeriod(false);
  };

  const handleDeletePeriod = (periodId) => {
    const updatedPeriods = periods.filter((p) => p.id !== periodId);
    onPeriodsChange(updatedPeriods);
  };

  const handleCancel = () => {
    setIsAddingPeriod(false);
    setEditingPeriod(null);
    setNewPeriod({
      start_date: "",
      end_date: "",
      description: "",
      priority: 1,
      project_id: null,
    });
  };

  const currentPeriod = editingPeriod || newPeriod;

  return (
    <div className="experience-periods-manager">
      <div className="periods-header">
        <h4>
          <Calendar size={16} />
          Périodes d&apos;intervention ({periods.length})
        </h4>
        {!isAddingPeriod && (
          <button
            onClick={() => {
              setEditingPeriod(null);
              setIsAddingPeriod(true);
            }}
            className="add-period-btn"
          >
            <Plus size={16} />
            Ajouter une période
          </button>
        )}
      </div>

      {isAddingPeriod && (
        <div className="period-form">
          <h5>{editingPeriod ? "Modifier la période" : "Nouvelle période"}</h5>

          <div className="form-row">
            <div className="form-group">
              <label>Date de début *</label>
              <input
                type="date"
                value={currentPeriod.start_date}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingPeriod) {
                    setEditingPeriod((prev) => ({
                      ...prev,
                      start_date: value,
                    }));
                  } else {
                    setNewPeriod((prev) => ({ ...prev, start_date: value }));
                  }
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>Date de fin *</label>
              <input
                type="date"
                value={currentPeriod.end_date}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingPeriod) {
                    setEditingPeriod((prev) => ({ ...prev, end_date: value }));
                  } else {
                    setNewPeriod((prev) => ({ ...prev, end_date: value }));
                  }
                }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              rows={10}
              placeholder="Ex: Première version, Améliorations, Corrections..."
              value={currentPeriod.description}
              onChange={(e) => {
                const value = e.target.value;
                if (editingPeriod) {
                  setEditingPeriod((prev) => ({ ...prev, description: value }));
                } else {
                  setNewPeriod((prev) => ({ ...prev, description: value }));
                }
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>Priorité</label>
            <input
              type="number"
              min="1"
              max="10"
              value={currentPeriod.priority}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (editingPeriod) {
                  setEditingPeriod((prev) => ({ ...prev, priority: value }));
                } else {
                  setNewPeriod((prev) => ({ ...prev, priority: value }));
                }
              }}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Annuler
            </button>
            <button
              type="button"
              onClick={editingPeriod ? handleUpdatePeriod : handleAddPeriod}
              className="submit-btn"
            >
              {editingPeriod ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </div>
      )}

      {periods.length > 0 && (
        <div className="periods-list">
          {periods.map((period) => (
            <div key={period.id} className="period-card">
              <div className="period-info">
                <div className="period-dates">
                  <strong>
                    {new Date(period.start_date).toLocaleDateString("fr-FR")} -
                    {new Date(period.end_date).toLocaleDateString("fr-FR")}
                  </strong>
                </div>
                <div className="period-description">{period.description}</div>
                <div className="period-priority">
                  Priorité: {period.priority}
                </div>
              </div>

              <div className="period-actions">
                <button
                  type="button"
                  onClick={() => handleEditPeriod(period.id)}
                  className="edit-btn"
                  title="Modifier"
                >
                  <Edit size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePeriod(period.id)}
                  className="delete-btn"
                  title="Supprimer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {periods.length === 0 && !isAddingPeriod && (
        <div className="no-periods">
          <p>Aucune période d&apos;intervention définie</p>
          <p>Ajoutez votre première période pour commencer</p>
        </div>
      )}
    </div>
  );
}

ExperiencePeriodsManager.propTypes = {
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.number,
      project_id: PropTypes.number,
    })
  ),
  onPeriodsChange: PropTypes.func.isRequired,
};
