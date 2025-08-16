import { AnimatePresence, motion } from "framer-motion";
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

  // Animations variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="project-detail-page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {loading && <Skeleton className="project-detail-page" />}
        {error && (
          <motion.div
            variants={errorVariants}
            initial="hidden"
            animate="visible"
          >
            Erreur: {error}
          </motion.div>
        )}
        {error && !project && (
          <motion.div
            className="project-not-found"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
          >
            <h2>Projet non trouvé</h2>
            <Link to="/">Retour à l&apos;accueil</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={sectionVariants}>
        <ProjectHeader project={project} />
      </motion.div>

      {/* Gallery */}
      <motion.div variants={sectionVariants}>
        <ProjectGallery project={project} onImageClick={setSelectedImage} />
      </motion.div>

      {/* Contenu principal */}
      <motion.div className="project-content" variants={sectionVariants}>
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
      </motion.div>

      {/* Modal plein écran */}
      <AnimatePresence>
        {selectedImage && (
          <FullscreenModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectDetail;
