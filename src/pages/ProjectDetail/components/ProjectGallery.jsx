import PropTypes from "prop-types";
import { getCarouselConfig } from "../../../constants/carouselConfig";
import { useResponsive } from "../../../hooks/useResponsive";
import CarouselGallery from "./CarouselGallery";
import EmptyGallery from "./EmptyGallery";
import StaticGallery from "./StaticGallery";

export default function ProjectGallery({ project, onImageClick }) {
  const screenSize = useResponsive();
  const config = getCarouselConfig(project?.picture, screenSize);

  const renderGallery = () => {
    const galleryComponents = {
      static: (
        <StaticGallery
          images={project?.picture}
          onImageClick={onImageClick}
          title={project?.title}
        />
      ),
      carousel: (
        <CarouselGallery
          images={project?.picture}
          config={config}
          onImageClick={onImageClick}
          title={project?.title}
        />
      ),
      empty: <EmptyGallery />,
    };

    // Utilise directement le type de la configuration
    return galleryComponents[config.type];
  };

  return (
    <div className="project-gallery">
      <div className="container">
        <div className="gallery-header">
          <h2>Galerie du projet</h2>
          {config.shouldShow && (
            <p>Cliquez sur une image pour l&apos;agrandir</p>
          )}
        </div>
        {renderGallery()}
      </div>
    </div>
  );
}

ProjectGallery.propTypes = {
  project: PropTypes.object,
  onImageClick: PropTypes.func,
};
