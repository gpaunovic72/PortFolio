import PropTypes from "prop-types";
import CarouselSlides from "../CarouselSlides";
import "../ModalProject/ModalProject.scss";

export default function ModalProject({ project, closeModal }) {
  if (!project) return null;

  return (
    <>
      <div onClick={closeModal} className="close" />
      <div className="modal">
        <button className="modal__close" onClick={closeModal}>
          X
        </button>
        <div className="modal__card">
          <div className="modal__card--container">
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
          <h3 className="modal__title">{project.title}</h3>
          <div className="modal__separation" />
          <div className="modal__description">
            <p className="modal__description--detail">{project.description}</p>
          </div>
          <a href={project.lien} target="_blank" className="modal__link">
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
