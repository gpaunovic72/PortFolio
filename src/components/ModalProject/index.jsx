import PropTypes from "prop-types";
import CarouselSlides from "../CarouselSlides";
import "../ModalProject/ModalProject.scss";

export default function ModalProject({ project, closeModal }) {
  if (!project) return null;

  return (
    <>
      <div onClick={closeModal} className="close" />
      <div className="modalProject">
        <button className="modalProject__close" onClick={closeModal}>
          X
        </button>
        <div className="modalProject__card">
          <div className="modalProject__card--container">
            {Array.isArray(project.picture) ? (
              <CarouselSlides pictures={project.picture} />
            ) : (
              <img
                src={project.picture}
                alt={`Image du ${project.title}`}
                className="img"
              />
            )}
          </div>
          <h3 className="modalProject__title">{project.title}</h3>
          <div className="modalProject__separation" />
          <div className="modalProject__description">
            <p className="modalProject__description--detail">
              {project.description}
            </p>
          </div>
          <a href={project.lien} target="_blank" className="modalProject__link">
            Voir plus
          </a>
        </div>
      </div>
    </>
  );
}

ModalProject.propTypes = {
  closeModal: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};
