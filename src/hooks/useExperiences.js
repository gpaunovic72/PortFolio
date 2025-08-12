import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const months = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

// UTILITAIRES DE DATES

/**
 * Convertit une date en mois total (année * 12 + mois)
 */
const dateToTotalMonths = (dateString) => {
  const [year, month] = dateString.split("-").map(Number);
  return year * 12 + month;
};

/**
 * Vérifie si un mois est dans une période donnée
 */
const isMonthInPeriod = (year, month, startDate, endDate) => {
  const currentMonth = year * 12 + month;
  const startMonth = dateToTotalMonths(startDate);
  const endMonth = dateToTotalMonths(endDate);

  return currentMonth >= startMonth && currentMonth <= endMonth;
};

/**
 * Calcule le nombre de cases à colorer pour un mois
 */
const calculateCasesForMonth = (year, month, startDate, endDate) => {
  const currentMonth = year * 12 + month;
  const endMonth = dateToTotalMonths(endDate);

  // Si c'est le dernier mois de la période, calculer les cases restantes
  if (currentMonth === endMonth) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const endDay = new Date(endDate).getDate();
    const cases = Math.max(1, Math.round((endDay / daysInMonth) * 5));
    return Math.min(cases, 5);
  }

  // Sinon, colorer toutes les cases du mois
  return 5;
};

// HOOK PRINCIPAL

export function useExperiences(refreshTrigger = 0) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // RÉCUPÉRATION DES DONNÉES

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("experiences")
          .select(
            "id, name, company, start_date, end_date, priority, color, is_dev_experience, periods"
          )
          .eq("is_dev_experience", true)
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

  // CALCUL DES ANNÉES

  const years = useMemo(() => {
    const allYears = new Set();

    experiences.forEach((exp) => {
      if (exp.periods && Array.isArray(exp.periods)) {
        exp.periods.forEach((period) => {
          if (period.start_date) {
            allYears.add(parseInt(period.start_date.split("-")[0]));
          }
          if (period.end_date) {
            allYears.add(parseInt(period.end_date.split("-")[0]));
          }
        });
      } else {
        if (exp.start_date) {
          allYears.add(parseInt(exp.start_date.split("-")[0]));
        }
        if (exp.end_date) {
          allYears.add(parseInt(exp.end_date.split("-")[0]));
        }
      }
    });

    return Array.from(allYears).sort((a, b) => b - a);
  }, [experiences]);

  // CALCUL DES PÉRIODES PAR MOIS

  const getMonthPeriods = useMemo(() => {
    return (year, month) => {
      const periods = [];

      experiences.forEach((exp) => {
        if (exp.periods && Array.isArray(exp.periods)) {
          // Utiliser les périodes multiples
          exp.periods.forEach((period) => {
            if (
              period.start_date &&
              period.end_date &&
              isMonthInPeriod(year, month, period.start_date, period.end_date)
            ) {
              const cases = calculateCasesForMonth(
                year,
                month,
                period.start_date,
                period.end_date
              );

              periods.push({
                id: exp.id,
                name: exp.name,
                description: period.description,
                color: exp.color,
                cases: cases,
                priority: exp.priority || 0,
                startDate: period.start_date,
                endDate: period.end_date,
              });
            }
          });
        } else {
          // Utiliser les dates principales de l'expérience
          if (
            exp.start_date &&
            exp.end_date &&
            isMonthInPeriod(year, month, exp.start_date, exp.end_date)
          ) {
            const cases = calculateCasesForMonth(
              year,
              month,
              exp.start_date,
              exp.end_date
            );

            periods.push({
              id: exp.id,
              name: exp.name,
              description: exp.name,
              color: exp.color,
              cases: cases,
              priority: exp.priority || 0,
              startDate: exp.start_date,
              endDate: exp.end_date,
            });
          }
        }
      });

      // Trier par priorité
      return periods.sort((a, b) => b.priority - a.priority);
    };
  }, [experiences]);

  // FONCTION D'AFFICHAGE

  const isMonthColored = (year, monthIndex) => {
    const month = monthIndex + 1;
    const periods = getMonthPeriods(year, month);

    if (periods.length === 0) return null;

    // Retourner le format attendu par le composant
    return periods.map((period) => ({
      color: period.color,
      cases: period.cases,
      priority: period.priority,
    }));
  };

  return {
    experiences,
    months,
    years,
    isMonthColored,
    getMonthPeriods,
    loading,
    error,
  };
}
