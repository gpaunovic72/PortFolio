import { AlertTriangle, Lock } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import "./LoginForm.scss";

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      error && setMessage(`Erreur: ${error.message}`);
      !error && setMessage("Connexion réussie !");
      !error && setEmail("");
      !error && setPassword("");
      !error && onLoginSuccess();
    } catch {
      setMessage("Erreur de connexion");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__container">
        <h2 className="login-form__title">
          <Lock size={20} style={{ marginRight: "8px", display: "inline" }} />
          Accès Administrateur
        </h2>

        {message && (
          <div
            className={`login-form__message ${
              message.includes("connexion")
                ? "login-form__message--success"
                : "login-form__message--error"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="login-form__field">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={isLoggingIn}
            />
          </div>

          <div className="login-form__field">
            <label>Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe"
              required
              disabled={isLoggingIn}
            />
          </div>

          <button
            type="submit"
            className="login-form__submit-btn"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="login-form__info">
          <p>
            <AlertTriangle
              size={14}
              style={{ marginRight: "4px", display: "inline" }}
            />
            Accès réservé à l&apos;administrateur
          </p>
          <p>Cette page permet de gérer les projets du portfolio</p>
        </div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};
