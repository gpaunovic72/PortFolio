import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "emailjs-com";
import { CheckCircle, Loader2, Send, XCircle } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema } from "../../lib/schemaForm";
import "../ModalContent/ModalContent.scss";

export default function ModalContent({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = async (formData) => {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
    );
  };

  const onSubmit = async (data) => {
    try {
      setSubmitStatus(null);
      await sendEmail(data);
      setSubmitStatus("success");
      reset();

      // Fermer la modal après 2 secondes
      setTimeout(() => {
        closeModal();
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitStatus("error");
    }
  };

  const getSubmitButtonContent = () => {
    return (
      (isSubmitting && (
        <>
          <Loader2 className="animate-spin" size={18} />
        </>
      )) ||
      (submitStatus === "success" && (
        <>
          <CheckCircle size={18} />
          <span>Message envoyé !</span>
        </>
      )) ||
      (submitStatus === "error" && (
        <>
          <XCircle size={18} />
          <span>Erreur d&apos;envoi</span>
        </>
      )) || (
        <>
          <Send size={18} />
          <span>Envoyer</span>
        </>
      )
    );
  };

  return (
    <>
      <div onClick={closeModal} className="close" />
      <div className="modal">
        <button className="modal__close" onClick={closeModal}>
          ×
        </button>
        <h2 className="modal__title">Contactez-moi</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="modal__form">
          <div className="modal__form--field">
            <label htmlFor="name" className="modal__form--label">
              Nom
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              name="name"
              placeholder="Votre nom complet"
              className={`modal__form--input ${errors.name ? "error" : ""}`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="modal__form--error">{errors.name.message}</span>
            )}
          </div>

          <div className="modal__form--field">
            <label htmlFor="email" className="modal__form--label">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              name="email"
              placeholder="votre.email@exemple.com"
              className={`modal__form--input ${errors.email ? "error" : ""}`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="modal__form--error">{errors.email.message}</span>
            )}
          </div>

          <div className="modal__form--field">
            <label htmlFor="message" className="modal__form--label">
              Message
            </label>
            <textarea
              {...register("message")}
              id="message"
              name="message"
              placeholder="Décrivez votre projet ou posez votre question..."
              rows="5"
              className={`modal__form--text ${errors.message ? "error" : ""}`}
              disabled={isSubmitting}
            />
            {errors.message && (
              <span className="modal__form--error">
                {errors.message.message}
              </span>
            )}
          </div>

          {submitStatus === "success" && (
            <div className="modal__form--success">
              Votre message a été envoyé avec succès ! Je vous répondrai dans
              les plus brefs délais.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="modal__form--error">
              Une erreur est survenue lors de l&apos;envoi. Veuillez réessayer
              ou me contacter directement.
            </div>
          )}

          <button
            type="submit"
            className={`modal__form--submit ${
              submitStatus === "success"
                ? "success"
                : submitStatus === "error"
                ? "error"
                : ""
            }`}
            disabled={isSubmitting || submitStatus === "success"}
          >
            {getSubmitButtonContent()}
          </button>
        </form>
      </div>
    </>
  );
}

ModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
