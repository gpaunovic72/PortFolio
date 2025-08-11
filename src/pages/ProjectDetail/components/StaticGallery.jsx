import { Maximize2 } from "lucide-react";
import PropTypes from "prop-types";

export default function StaticGallery({ images, onImageClick, title }) {
  return (
    <div className="static-gallery">
      {images?.map((image, index) => (
        <div
          key={index}
          className="gallery-item"
          onClick={() => onImageClick(image)}
        >
          <img
            src={image}
            alt={`${title} - Image ${index + 1}`}
            className="gallery-image"
          />
          <div className="gallery-overlay">
            <Maximize2 size={24} />
          </div>
        </div>
      ))}
    </div>
  );
}

StaticGallery.propTypes = {
  images: PropTypes.array,
  onImageClick: PropTypes.func,
  title: PropTypes.string,
};
