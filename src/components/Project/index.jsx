import { motion } from "framer-motion";
import { useProjects } from "../../hooks/useProjects";
import "../Project/Project.scss";
import ProjectButton from "../ProjectButton";

export default function Project() {
  const { projects, loading, error } = useProjects();

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="project"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="project__title" variants={titleVariants}>
        Projets
      </motion.h2>
      <motion.hr className="project__separation" variants={titleVariants} />
      <motion.div className="project__cards" variants={containerVariants}>
        {loading && <div>Chargement des projets...</div>}
        {error && <div>Erreur: {error}</div>}
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project__cards--card"
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
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
            <div className="projectYear">
              {new Date(project.created_at).getFullYear()}
            </div>
            <div className="btnProject">
              <ProjectButton project={project} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
