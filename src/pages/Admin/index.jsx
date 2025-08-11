import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import "./Admin.scss";
import DashboardHeader from "./components/DashboardHeader";
import LoginForm from "./components/LoginForm";
import ProjectManager from "./components/ProjectManager";

export default function AdminPage() {
  const { projects, loading, error } = useProjects();
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Si pas connecté, afficher le formulaire de connexion
  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Si en cours de chargement des projets
  if (loading) {
    return (
      <div style={{ color: "#c9d1d9", padding: "2rem" }}>Chargement...</div>
    );
  }

  // Si erreur lors du chargement des projets
  if (error) {
    return (
      <div style={{ color: "#da3633", padding: "2rem" }}>Erreur: {error}</div>
    );
  }

  return (
    <div className="admin-page">
      {/* En-tête et messages */}
      <DashboardHeader onLogout={setMessage} message={message} />

      {/* Gestion des projets */}
      <ProjectManager projects={projects} onProjectUpdate={setMessage} />
    </div>
  );
}
