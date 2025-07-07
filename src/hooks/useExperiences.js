import { useMemo } from "react";
import { experiences, months } from "../data/experiences";

// Fonction pour calculer le nombre de cases basé sur les jours dans le mois
const calculateCases = (startDate, endDate, year, monthIndex) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const monthStart = new Date(year, monthIndex, 1);
  const monthEnd = new Date(year, monthIndex + 1, 0);

  // Vérifier si l'expérience se situe dans ce mois
  if (end < monthStart || start > monthEnd) {
    return 0;
  }

  // Limiter les dates à ce mois
  const effectiveStart = start < monthStart ? monthStart : start;
  const effectiveEnd = end > monthEnd ? monthEnd : end;

  // Calculer le nombre de jours couverts dans ce mois
  const daysInMonth = monthEnd.getDate();
  const daysCovered =
    Math.ceil((effectiveEnd - effectiveStart) / (1000 * 60 * 60 * 24)) + 1;

  // Convertir en nombre de cases (1-5)
  if (daysCovered <= 0) return 0;
  if (daysCovered >= daysInMonth) return 5;

  // Calcul proportionnel
  const cases = Math.max(1, Math.round((daysCovered / daysInMonth) * 5));

  return cases;
};

// Fonction pour vérifier si une date est dans une plage
const isDateInRange = (currentDate, startDate, endDate) => {
  const current = new Date(currentDate + "-01");
  const start = new Date(startDate);
  const end = new Date(endDate);

  return current >= start && current <= end;
};

export function useExperiences() {
  const years = useMemo(() => {
    const allYears = [];

    experiences.forEach((exp) => {
      if (exp.periods) {
        exp.periods.forEach((period) => {
          allYears.push(
            parseInt(period.start.split("-")[0]),
            parseInt(period.end.split("-")[0])
          );
        });
      } else {
        allYears.push(
          parseInt(exp.start.split("-")[0]),
          parseInt(exp.end.split("-")[0])
        );
      }
    });

    return [...new Set(allYears)].sort((a, b) => b - a);
  }, []);

  const isMonthColored = (year, monthIndex) => {
    const currentDate = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
    const monthExperiences = [];

    for (const exp of experiences) {
      if (exp.periods) {
        for (const period of exp.periods) {
          if (isDateInRange(currentDate, period.start, period.end)) {
            const cases = calculateCases(
              period.start,
              period.end,
              year,
              monthIndex
            );
            if (cases > 0) {
              monthExperiences.push({
                color: exp.color,
                cases: cases,
                priority: period.priority || 1,
              });
            }
          }
        }
      } else {
        if (isDateInRange(currentDate, exp.start, exp.end)) {
          const cases = calculateCases(exp.start, exp.end, year, monthIndex);
          if (cases > 0) {
            monthExperiences.push({
              color: exp.color,
              cases: cases,
              priority: exp.priority || 1,
            });
          }
        }
      }
    }

    // Trier par priorité (plus élevée en premier)
    monthExperiences.sort((a, b) => b.priority - a.priority);

    return monthExperiences.length > 0 ? monthExperiences : null;
  };

  return { experiences, months, years, isMonthColored };
}
