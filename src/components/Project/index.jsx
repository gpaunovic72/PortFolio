import { useProjects } from "../../hooks/useProjects";
import "../Project/Project.scss";
import ProjectButton from "../ProjectButton";

export default function Project() {
  const { projects, loading, error } = useProjects();

  return (
    <div className="project">
      <h2 className="project__title">Projets</h2>
      <hr className="project__separation" />
      <div className="project__cards">
        {loading && <div>Chargement des projets...</div>}
        {error && <div>Erreur: {error}</div>}
        {projects.map((project) => (
          <div key={project.id} className="project__cards--card">
            <div className="cardElements">
              <div className="title">
                <h3>{project.title}</h3>
              </div>
              <div className="card">
                {project.stacks.map((tech, index) => (
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
              <ProjectButton project={project} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
