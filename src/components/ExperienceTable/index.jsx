import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useExperiences } from "../../hooks/useExperiences";
import "../ExperienceTable/ExperienceTable.scss";

export default function ExperienceTable() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [localExperiences, setLocalExperiences] = useState([]);

  const { experiences, months, years, isMonthColored, loading, error } =
    useExperiences(refreshTrigger);

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
    if (!monthPeriods || !Array.isArray(monthPeriods)) {
      return "#161b22"; // Couleur par défaut
    }

    let currentCase = 0;

    for (const period of monthPeriods) {
      if (caseIndex >= currentCase && caseIndex < currentCase + period.cases) {
        return period.color;
      }
      currentCase += period.cases;
    }

    return "#161b22"; // Couleur par défaut
  };

  // ÉTATS DE CHARGEMENT ET D'ERREUR

  if (loading) {
    return (
      <div className="experiences">
        <h2 className="experiences__title">Expériences</h2>
        <hr className="experiences__separation" />
        <div className="loading">Chargement des expériences...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="experiences">
        <h2 className="experiences__title">Expériences</h2>
        <hr className="experiences__separation" />
        <div className="error">Erreur: {error}</div>
      </div>
    );
  }

  // RENDU PRINCIPAL

  return (
    <div className="experiences">
      <div className="experiences__header">
        <h2 className="experiences__title">Expériences</h2>
        <button
          onClick={() => setRefreshTrigger((prev) => prev + 1)}
          className="refresh-btn"
          title="Actualiser le tableau"
        >
          <RefreshCw size={16} />
          Actualiser
        </button>
      </div>

      <hr className="experiences__separation" />

      <div className="experiences__table">
        <MonthHeader />
        <YearHeader />
        <TimelineGrid />
      </div>

      <Legend />
    </div>
  );
}
