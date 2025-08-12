import { useEffect, useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { supabase } from "../../lib/supabase";
import "./Admin.scss";
import DashboardHeader from "./components/DashboardHeader";
import DashboardTabs from "./components/DashboardTabs";
import ExperienceManager from "./components/ExperienceManager";
import LoginForm from "./components/LoginForm";
import ProjectManager from "./components/ProjectManager";

export default function AdminPage() {
  const { projects, loading, error } = useProjects();
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error
        );
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const renderLoadingSpinner = () => (
    <div className="auth-loading">
      <div className="spinner"></div>
      <p>Vérification de l&apos;authentification...</p>
    </div>
  );

  const renderError = () => (
    <div className="error-message">Erreur: {error}</div>
  );

  const renderLoading = () => (
    <div className="loading-message">Chargement...</div>
  );

  return (
    <>
      {isCheckingAuth && renderLoadingSpinner()}
      {!isCheckingAuth && !isAuthenticated && (
        <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
      {!isCheckingAuth && isAuthenticated && loading && renderLoading()}
      {!isCheckingAuth && isAuthenticated && error && renderError()}
      {!isCheckingAuth && isAuthenticated && !loading && !error && (
        <div className="admin-page">
          <DashboardHeader onLogout={setMessage} message={message} />
          <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="tab-content">
            {activeTab === "projects" && (
              <ProjectManager
                projects={projects}
                onProjectUpdate={setMessage}
              />
            )}

            {activeTab === "experiences" && (
              <ExperienceManager onMessage={setMessage} />
            )}

            {activeTab === "stats" && (
              <div className="stats-section">
                <h2>Statistiques</h2>
                <p>Vue d&apos;ensemble de votre portfolio</p>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>{projects.length}</h3>
                    <p>Projets</p>
                  </div>
                  <div className="stat-card">
                    <h3>4</h3>
                    <p>Expériences</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
