import { useMemo } from "react";
import { experiences, months } from "../data/experiences";

export function useExperiences() {
  const years = useMemo(() => {
    return [
      ...new Set(
        experiences.flatMap((exp) => [
          parseInt(exp.start.split("-")[0]),
          parseInt(exp.end.split("-")[0]),
        ])
      ),
    ].sort((a, b) => b - a);
  }, []);

  const isMonthColored = (year, monthIndex) => {
    const month = monthIndex + 1; // Convertir l'index du mois (0-11) en mois (1-12)
    const currentDate = `${year}-${month.toString().padStart(2, "0")}`;

    const experience = experiences.find(({ start, end }) => {
      return currentDate >= start && currentDate <= end;
    });

    return experience ? experience.color : "";
  };

  return { experiences, months, years, isMonthColored };
}
