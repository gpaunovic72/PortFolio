import PropTypes from "prop-types";
import "../PictureProfile/PictureProfile.scss";

export default function PictureProfile({ picture, name }) {
  return (
    <>
      <img
        src={picture}
        alt={`Photographie de ${name}`}
        aria-label="Picture"
        className="picture"
      />
    </>
  );
}

PictureProfile.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
