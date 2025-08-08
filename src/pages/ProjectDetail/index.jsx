import { ArrowLeft, ExternalLink, Maximize2, X } from "lucide-react"; // ← Icônes Lucide
import { useState } from "react";
import Marquee from "react-fast-marquee";
import { Link, useParams } from "react-router-dom";
import { cards } from "../../data/projectCard";
import "./ProjectDetail.scss";

const ProjectDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const project = cards.find((card) => card.id === parseInt(id));

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Projet non trouvé</h2>
        <Link to="/">Retour à l&apos;accueil</Link>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Header */}
      <div className="project-header">
        <div className="container">
          <Link to="/" className="btn-back">
            <ArrowLeft size={16} />
            Retour
          </Link>
          <div className="project-meta">
            <h1>{project.title}</h1>
            <div className="project-info">
              <span className="project-date">{project.date}</span>
              <div className="project-stacks-preview">
                {project.stacks.map((stack, index) => (
                  <span
                    key={index}
                    className="stack-preview"
                    style={{ backgroundColor: stack.color }}
                  >
                    {stack.stack}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Galerie */}
      <div className="project-gallery">
        <div className="container">
          <div className="gallery-header">
            <h2>Galerie du projet</h2>
            <p>Cliquez sur une image pour l&apos;agrandir</p>
          </div>
          <div className="marquee-container">
            <Marquee
              speed={30}
              gradient={true}
              gradientColor={[13, 17, 23]}
              gradientWidth={100}
            >
              {project.picture.map((image, index) => (
                <div
                  key={index}
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <Maximize2 size={24} />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="project-content">
        <div className="container">
          <div className="content-grid">
            {/* Description */}
            <div className="project-description">
              <h3>À propos du projet</h3>
              <div className="description-text">
                {project.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Stack technique */}
            <div className="project-stacks">
              <h3>Technologies utilisées</h3>
              <div className="stacks-grid">
                {project.stacks.map((stack, index) => (
                  <div key={index} className="stack-item">
                    <div
                      className="stack-color"
                      style={{ backgroundColor: stack.color }}
                    />
                    <span className="stack-name">{stack.stack}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          {project.lien && (
            <div className="project-actions">
              <a
                href={project.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-visit-site"
              >
                <span>Voir le projet</span>
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Modal plein écran */}
      {selectedImage && (
        <div
          className="fullscreen-modal"
          onClick={() => setSelectedImage(null)}
        >
          <div className="fullscreen-content">
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Vue plein écran"
              className="fullscreen-image"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
