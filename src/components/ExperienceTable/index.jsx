import { useEffect, useState } from "react";
import { useExperiences } from "../../hooks/useExperiences";
import "../ExperienceTable/ExperienceTable.scss";

export default function ExperienceTable() {
  const [localExperiences, setLocalExperiences] = useState([]);

  const { experiences, months, years, isMonthColored, loading, error } =
    useExperiences(0);

  // Synchroniser les expériences locales
  useEffect(() => {
    setLocalExperiences(experiences);
  }, [experiences]);

  const MonthHeader = () => (
    <div className="experiences__table--month">
      {months.map((month) => (
        <div key={month} className="months">
          {month}
        </div>
      ))}
    </div>
  );

  const YearHeader = () => (
    <div className="experiences__table--year">
      {years.map((year) => (
        <div key={year} className="years">
          {year}
        </div>
      ))}
    </div>
  );

  const TimelineGrid = () => (
    <div className="experiences__table--box">
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} className="box-row">
          {[...Array(12)].map((_, monthIndex) => {
            const year = years[rowIndex] || "";
            const monthPeriods = isMonthColored(year, monthIndex);

            return (
              <div key={`${rowIndex}-${monthIndex}`} className="month-boxes">
                {[...Array(5)].map((_, caseIndex) => {
                  const backgroundColor = getCaseColor(monthPeriods, caseIndex);

                  return (
                    <span
                      key={`${rowIndex}-${monthIndex}-${caseIndex}`}
                      className="box"
                      style={{ backgroundColor }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const Legend = () => (
    <div className="experiences__data">
      {localExperiences.map((exp) => (
        <div key={`${exp.id}-${exp.name}`} className="experiences__data--exp">
          <div className="color" style={{ backgroundColor: exp.color }} />
          <div className="text">{exp.name}</div>
        </div>
      ))}
    </div>
  );

  // FONCTIONS UTILITAIRES

  const getCaseColor = (monthPeriods, caseIndex) => {
    const isValidPeriods = monthPeriods && Array.isArray(monthPeriods);

    if (!isValidPeriods) {
      return "#161b22"; // Couleur par défaut
    }

    let currentCase = 0;

    for (const period of monthPeriods) {
      const isInRange =
        caseIndex >= currentCase && caseIndex < currentCase + period.cases;

      if (isInRange) {
        return period.color;
      }
      currentCase += period.cases;
    }

    return "#161b22"; // Couleur par défaut
  };

  // ÉTATS DE CHARGEMENT ET D'ERREUR

  const renderContent = () => {
    const isLoading = loading;
    const hasError = error;

    return isLoading ? (
      <div className="experiences">
        <h2 className="experiences__title">Expériences</h2>
        <hr className="experiences__separation" />
        <div className="loading">Chargement des expériences...</div>
      </div>
    ) : hasError ? (
      <div className="experiences">
        <h2 className="experiences__title">Expériences</h2>
        <hr className="experiences__separation" />
        <div className="error">Erreur: {error}</div>
      </div>
    ) : (
      <div className="experiences">
        <h2 className="experiences__title">Expériences</h2>
        <hr className="experiences__separation" />

        <div className="experiences__table">
          <MonthHeader />
          <YearHeader />
          <TimelineGrid />
        </div>

        <Legend />
      </div>
    );
  };

  // RENDU PRINCIPAL

  return renderContent();
}
