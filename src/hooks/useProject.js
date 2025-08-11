import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useProject = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (err) {
        setError(err.message);
        console.error("Erreur lors de la récupération du projet:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
};
