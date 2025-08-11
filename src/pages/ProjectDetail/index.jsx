import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { useProject } from "../../hooks/useProject";
import "./ProjectDetail.scss";
import FullscreenModal from "./components/FullscreenModal";
import ProjectActions from "./components/ProjectActions";
import ProjectDescription from "./components/ProjectDescription";
import ProjectGallery from "./components/ProjectGallery";
import ProjectHeader from "./components/ProjectHeader";
import ProjectStack from "./components/ProjectStack";

const ProjectDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const { project, loading, error } = useProject(parseInt(id));

  return (
    <div className="project-detail-page">
      {loading && <Skeleton className="project-detail-page" />}
      {error && <div>Erreur: {error}</div>}
      {error && !project && (
        <div className="project-not-found">
          <h2>Projet non trouvé</h2>
          <Link to="/">Retour à l&apos;accueil</Link>
        </div>
      )}
      {/* Header */}
      <ProjectHeader project={project} />
      {/* Gallery */}
      <ProjectGallery project={project} onImageClick={setSelectedImage} />
      {/* Contenu principal */}
      <div className="project-content">
        <div className="container">
          <div className="content-grid">
            {/* Description */}
            <ProjectDescription project={project} />

            {/* Stack technique */}
            <ProjectStack project={project} />
          </div>

          {/* Actions */}
          <ProjectActions project={project} />
        </div>
      </div>

      {/* Modal plein écran */}
      {selectedImage && (
        <FullscreenModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
