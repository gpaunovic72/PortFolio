import PropTypes from "prop-types";
import "../Presentation/Presentation.scss";

export default function Presentation({ title, text }) {
  return (
    <div className="presentation">
      <h1 className="presentation__title">{title}</h1>
      <hr className="presentation__separation"></hr>
      <p className="presentation__text">{text}</p>
    </div>
  );
}

Presentation.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
