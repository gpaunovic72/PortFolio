import PropTypes from "prop-types";
import "../Profil/Profil.scss";

export default function Profil({ name, text }) {
  return (
    <div className="profil">
      <h2 className="profil__title">{name}</h2>
      <p className="profil__text">{text}</p>
    </div>
  );
}

Profil.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
