import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import ModalContent from "../components/ModalContent";

test("Le formulaire de contact s'affiche correctement", () => {
  render(<ModalContent />);

  expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(/Ecrivez votre message/i)
  ).toBeInTheDocument();
  expect(screen.getByDisplayValue(/envoyer/i));
});

test("Le bouton envoyer devient actif quand le formulaire est rempli", async () => {
  render(<ModalContent />);
  const nameInput = screen.getByLabelText(/Nom/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const messageInput = screen.getByPlaceholderText(/Ecrivez votre message/i);
  const submitButton = screen.getByDisplayValue(/envoyer/i);

  await userEvent.type(nameInput, "Goran");
  await userEvent.type(emailInput, "goran@example.com");
  await userEvent.type(messageInput, "Ceci est un message test.");
  expect(submitButton).toBeEnabled();
});
