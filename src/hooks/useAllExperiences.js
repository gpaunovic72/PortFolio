import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAllExperiences(refreshTrigger = 0) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("experiences")
          .select(
            "id, name, company, start_date, end_date, priority, color, is_dev_experience, periods, description"
          )
          .order("priority", { ascending: false });

        if (error) throw error;

        setExperiences(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Erreur lors de la récupération des expériences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [refreshTrigger]);

  return {
    experiences,
    loading,
    error,
  };
}
