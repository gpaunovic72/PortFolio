import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import ModalProject from "../components/ModalProject";

test("La modal projet s'affiche et se ferme", () => {
  const closeModal = vi.fn();
  const project = { title: "Test Project", description: "Description test" };

  render(<ModalProject project={project} closeModal={closeModal} />);
  expect(screen.getByText("Test Project")).toBeInTheDocument();
  fireEvent.click(screen.getByText("X"));
  expect(closeModal).toHaveBeenCalled();
});
