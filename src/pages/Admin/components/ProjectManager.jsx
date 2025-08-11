import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import ProjectCard from "./ProjectCard";

export default function ProjectManager({ projects, onProjectUpdate }) {
  const [editingProject, setEditingProject] = useState(null);
  const [localProjects, setLocalProjects] = useState(projects);

  // Synchroniser les projets quand ils changent
  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  // Fonction pour mettre à jour un projet
  const handleUpdateProject = async (projectId, updates) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", projectId);

      error &&
        (() => {
          throw error;
        })();

      setLocalProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, ...updates } : project
        )
      );

      setEditingProject(null);
      onProjectUpdate("Projet mis à jour avec succès !");
    } catch (error) {
      onProjectUpdate(`Erreur: ${error.message}`);
    }
  };

  // Fonction pour supprimer un projet
  const handleDeleteProject = async (projectId) => {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
    !confirmed &&
      (() => {
        return;
      })();

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      error &&
        (() => {
          throw error;
        })();

      // Supprimer du state local au lieu de recharger
      setLocalProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );

      onProjectUpdate("✅ Projet supprimé avec succès !");
    } catch (error) {
      onProjectUpdate(`❌ Erreur: ${error.message}`);
    }
  };

  // Fonction pour commencer l'édition
  const handleEditProject = (projectId, data) => {
    setEditingProject({ id: projectId, data });
  };

  // Fonction pour annuler l'édition
  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  // Fonction pour mettre à jour les données d'édition
  const handleUpdateEditingData = (newData) => {
    setEditingProject((prev) => ({
      ...prev,
      data: newData,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="admin-page__projects-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {localProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            isEditing={editingProject?.id === project.id}
            editingData={editingProject?.data}
            onSave={handleUpdateProject}
            onCancel={handleCancelEdit}
            onUpdateEditingData={handleUpdateEditingData}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

ProjectManager.propTypes = {
  projects: PropTypes.array.isRequired,
  onProjectUpdate: PropTypes.func.isRequired,
};
