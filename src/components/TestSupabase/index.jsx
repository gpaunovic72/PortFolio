import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { migrateProjects } from "../../scripts/migrateProjects";

export default function TestSupabase() {
  const [status, setStatus] = useState("");
  const [projects, setProjects] = useState([]);

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) throw error;
      setProjects(data || []);
      setStatus(`✅ Connexion réussie ! ${data?.length || 0} projets trouvés`);
    } catch (err) {
      setStatus(`❌ Erreur: ${err.message}`);
    }
  };

  const handleMigration = async () => {
    try {
      setStatus("🔄 Migration en cours...");
      await migrateProjects();
      setStatus("✅ Migration terminée !");
      checkConnection(); // Recharger les projets
    } catch (err) {
      setStatus(`❌ Erreur migration: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f0f0f0", margin: "20px 0" }}>
      <h3>Test Supabase</h3>
      <button onClick={checkConnection}>Tester la connexion</button>
      <button onClick={handleMigration} style={{ marginLeft: "10px" }}>
        Migrer tous les projets
      </button>
      <p>{status}</p>
      {projects.length > 0 && (
        <div>
          <h4>Projets dans la base :</h4>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>{project.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
