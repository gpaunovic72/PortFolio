import emailjs from "emailjs-com";
import { useState } from "react";
import validator from "validator";

export function useForm(closeModal) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: validator.isEmail(value) ? "" : "Email non valide",
      }));
    }

    if (name === "username") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameError:
          value.length >= 3 ? "" : "Le nom doit avoir au moins 3 caractères",
      }));
    }

    if (name === "message") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        messageError:
          value.length >= 10
            ? ""
            : "Le message doit contenir au moins 10 caractères",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setErrors({
        nameError: !formData.username.trim() ? "Le nom est requis" : "",
        emailError: !formData.email.trim() ? "L'email est requis" : "",
        messageError: !formData.message.trim() ? "Le message est requis" : "",
      });
      return;
    }

    if (errors.emailError || errors.nameError || errors.messageError) {
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        setFormData({ username: "", email: "", message: "" });
        setErrors({ emailError: "", nameError: "", messageError: "" });
        closeModal();
      });
  };
  return { formData, errors, handleChange, handleSubmit };
}
