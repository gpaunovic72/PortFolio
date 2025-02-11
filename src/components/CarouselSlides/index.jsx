import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../CarouselSlides/CarouselSlides.scss";

export default function CarouselSlides({ pictures }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (pictures.length > 1) {
      const slider = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % pictures.length);
      }, 5000);
      return () => clearInterval(slider);
    }
  }, [pictures.length]);

  if (!Array.isArray(pictures) || pictures.length === 0) {
    return null;
  }
  return (
    <div className="carouselContainer">
      {pictures.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`project ${i}`}
          className={`carouselContainer__img ${i === index ? "active" : ""}`}
        />
      ))}
    </div>
  );
}

CarouselSlides.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};
