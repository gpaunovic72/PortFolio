import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ProjectButton from "../components/ProjectButton";

test("Le bouton ouvre la modal projet", () => {
  render(<ProjectButton project={{ title: "Test Project" }} />);
  fireEvent.click(screen.getByText("Voir le projet"));
  expect(screen.getByText("Test Project")).toBeInTheDocument();
});
