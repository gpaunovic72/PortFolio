import { cards } from "../../data/projectCard";
import "../Project/Project.scss";
import ProjectButton from "../ProjectButton";

export default function Project() {
  return (
    <div className="project" id="projects">
      <h2 className="project__title">Projets</h2>
      <hr className="project__separation" />
      <div className="project__cards">
        {cards.map((card) => (
          <div key={card.id} className="project__cards--card">
            <div className="cardElements">
              <div className="title">
                <h3>{card.title}</h3>
                <p>{card.date}</p>
              </div>
              <div className="card">
                {card.stacks.map((tech, index) => (
                  <span key={index} className="card__stack">
                    <div
                      style={{ backgroundColor: tech.color }}
                      className="card__stack--color"
                    />
                    {tech.stack}
                  </span>
                ))}
              </div>
            </div>
            <div className="btnProject">
              <ProjectButton project={card} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
