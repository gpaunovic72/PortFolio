import { LogOut, Settings } from "lucide-react";
import PropTypes from "prop-types";
import { supabase } from "../../../lib/supabase";

export default function DashboardHeader({ onLogout, message }) {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onLogout("Déconnexion réussie");
      window.location.reload();
    } catch {
      onLogout("Erreur de déconnexion");
    }
  };

  return (
    <>
      {/* En-tête avec bouton de déconnexion */}
      <div className="admin-page__header">
        <h2>
          <Settings
            size={20}
            style={{ marginRight: "8px", display: "inline" }}
          />
          Dashboard d&apos;Administration
        </h2>
        <button
          className="admin-page__header--logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={16} style={{ marginRight: "4px" }} />
          Se déconnecter
        </button>
      </div>

      {/* Message de statut */}
      {message && (
        <div
          className={`admin-page__message ${
            message.includes("connexion")
              ? "admin-page__message--success"
              : message.includes("erreur")
              ? "admin-page__message--error"
              : "admin-page__message--info"
          }`}
        >
          {message}
        </div>
      )}
    </>
  );
}

DashboardHeader.propTypes = {
  onLogout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
