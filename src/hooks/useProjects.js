import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Erreur lors de la récupération des projets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
