import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function FullscreenModal({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fullscreen-modal" onClick={handleBackdropClick}>
      <div className="fullscreen-content">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Fermer la modal"
          title="Fermer (Échap)"
        >
          <X size={24} />
        </button>
        <img
          src={image}
          alt="Vue plein écran"
          className="fullscreen-image"
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
}

FullscreenModal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
