import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Header from "../components/Header";

test("Le header est affiché", () => {
  render(<Header />);
  const navbar = screen.getByRole("banner");
  expect(navbar).toBeInTheDocument();
});
