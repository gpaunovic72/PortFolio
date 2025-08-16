import { motion } from "framer-motion";
import stackList from "../../data/stackList";
import "../Stack/Stack.scss";

export default function Stack() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
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

  return (
    <motion.div
      className="stack"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="stack__title"
        variants={titleVariants}
      >
        STACK
      </motion.h2>
      <motion.hr
        className="stack__separation"
        variants={titleVariants}
      />
      <motion.div
        className="stack__cards"
        variants={containerVariants}
      >
        {stackList.map((item) => (
          <motion.div
            className="stack__cards--onCard"
            key={item.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={item.icon} alt={item.name} className="icon" />
            <p className="text">{item.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
