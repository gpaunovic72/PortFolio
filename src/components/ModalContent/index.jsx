import PropTypes from "prop-types";
import { useForm } from "../../hooks/useForm";
import "../ModalContent/ModalContent.scss";

export default function ModalContent({ closeModal }) {
  const { formData, errors, handleChange, handleSubmit } = useForm(closeModal);
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
            className={`modal__form--input ${errors.nameError ? "error" : ""}`}
          />
          {errors.nameError && (
            <span className="modal__form--error">{errors.nameError}</span>
          )}
          <label htmlFor="email" className="modal__form--label">
            Email
          </label>
          <input
            name="email"
            type="text"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`modal__form--input ${errors.emailError ? "error" : ""}`}
          />
          {errors.emailError && (
            <span className="modal__form--error">{errors.emailError}</span>
          )}
          <textarea
            name="message"
            id="msg"
            value={formData.message}
            onChange={handleChange}
            className={`modal__form--text ${
              errors.messageError ? "error" : ""
            }`}
            placeholder="Ecrivez votre message"
          ></textarea>
          {errors.messageError && (
            <span className="modal__form--error">{errors.messageError}</span>
          )}
          <input
            type="submit"
            value="Envoyer"
            className="modal__form--submit"
            disabled={
              errors.emailError || errors.messageError || errors.nameError
            }
          />
        </form>
      </div>
    </>
  );
}

ModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
