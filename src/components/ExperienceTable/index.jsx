import { experiences } from "../../data/experiences";
import { useExperiences } from "../../hooks/useExperiences";
import "../ExperienceTable/ExperienceTable.scss";

export default function ExperienceTable() {
  const { months, years, isMonthColored } = useExperiences();

  return (
    <div className="experiences">
      <h2 className="experiences__title">Expériences</h2>
      <hr className="experiences__separation" />
      <div className="experiences__table">
        <div className="experiences__table--month">
          {months.map((month) => (
            <div key={month} className="months">
              {month}
            </div>
          ))}
        </div>
        <div className="experiences__table--year">
          {years.map((year) => (
            <div key={year} className="years">
              {year}
            </div>
          ))}
        </div>
        <div className="experiences__table--box">
          {[...Array(5)].map((_, rowIndex) => (
            <div key={rowIndex} className="box-row">
              {[...Array(12)].map((_, monthIndex) => {
                const year = years[rowIndex] || "";
                const color = isMonthColored(year, monthIndex);
                return (
                  <div
                    key={`${rowIndex}-${monthIndex}`}
                    className="month-boxes"
                  >
                    {[...Array(5)].map((_, caseIndex) => (
                      <span
                        key={`${rowIndex}-${monthIndex}-${caseIndex}`}
                        className="box"
                        style={{
                          backgroundColor: color ? color : "#161b22",
                        }}
                      ></span>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="experiences__data">
        {experiences.map((exp) => (
          <div key={exp} className="experiences__data--exp">
            <div className="color" style={{ backgroundColor: exp.color }} />
            <div className="text">{exp.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
