import PropTypes from "prop-types";
import { useState } from "react";
import CarouselSlides from "../CarouselSlides";
import "../ModalProject/ModalProject.scss";

export default function ModalProject({ project, closeModal }) {
  const [selectedImage, setSelectedImage] = useState(null);
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
            <CarouselSlides
              pictures={
                Array.isArray(project.picture)
                  ? project.picture
                  : [project.picture]
              }
              onClick={(image) => setSelectedImage(image)}
            />
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

      {selectedImage && (
        <div className="fullscreen" onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Agrandissement de l'image"
            className="fullscreen__img"
          />
        </div>
      )}
    </>
  );
}

ModalProject.propTypes = {
  closeModal: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};
