import { Maximize2 } from "lucide-react";
import PropTypes from "prop-types";
import Marquee from "react-fast-marquee";

export default function CarouselGallery({
  images,
  config,
  onImageClick,
  title,
}) {
  return (
    <div className="marquee-container">
      <Marquee
        speed={config.speed}
        gradient={true}
        gradientColor={[13, 17, 23]}
        gradientWidth={100}
      >
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
      </Marquee>
    </div>
  );
}

CarouselGallery.propTypes = {
  images: PropTypes.array,
  config: PropTypes.object,
  onImageClick: PropTypes.func,
  title: PropTypes.string,
};
