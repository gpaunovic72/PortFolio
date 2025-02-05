import emailjs from "emailjs-com";
import PropTypes from "prop-types";
import { useState } from "react";
import "../ModalContent/ModalContent.scss";

export default function ModalContent({ closeModal }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        setFormData({ username: "", email: "", message: "" });
        closeModal();
      });
  };
  return (
    <>
      <div onClick={closeModal} className="close" />
      <div className="modal">
        <button className="modal__close" onClick={closeModal}>
          X
        </button>
        <h2 className="modal__title">Contactez-moi</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <label htmlFor="username" className="modal__form--label">
            Nom
          </label>
          <input
            name="username"
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="modal__form--input"
          />
          <label htmlFor="email" className="modal__form--label">
            Email
          </label>
          <input
            name="email"
            type="text"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="modal__form--input"
          />
          <textarea
            name="message"
            id="msg"
            value={formData.message}
            onChange={handleChange}
            className="modal__form--text"
            placeholder="Ecrivez votre message"
          ></textarea>
          <input
            type="submit"
            value="Envoyer"
            className="modal__form--submit"
          />
        </form>
      </div>
    </>
  );
}

ModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
