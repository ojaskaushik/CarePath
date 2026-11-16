import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import HealthLibrary from "./HealthLibrary";

const topicNames = [
  "Common Cold", "Headaches", "Sore Throat",
  "Seasonal Allergies", "Dehydration", "Constipation",
];

function renderLibrary() {
  render(<MemoryRouter><HealthLibrary /></MemoryRouter>);
  return screen.getByRole("searchbox", { name: "Search health topics" });
}

describe("Health Library browsing", () => {
  it("shows all six topics and their detail links", () => {
    renderLibrary();
    for (const name of topicNames) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeTruthy();
      const link = screen.getByRole("link", { name: new RegExp(`^${name}\\b`) });
      expect(link.getAttribute("href")).toBe(`/health-library/${name.toLowerCase().replaceAll(" ", "-")}`);
    }
    expect(screen.getByRole("status").textContent).toContain("6 topics found");
  });

  it.each([
    ["Headaches", "Headaches"],
    ["professional attention", "Headaches"],
    ["pollen", "Seasonal Allergies"],
    ["PoLlEn", "Seasonal Allergies"],
    ["  HEADACHES  ", "Headaches"],
  ])("filters search %j to %s", (query, name) => {
    const input = renderLibrary();
    fireEvent.change(input, { target: { value: query } });
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 2, name })).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain("1 topic found");
  });

  it("treats a whitespace-only search as empty", () => {
    const input = renderLibrary();
    fireEvent.change(input, { target: { value: "   " } });
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(6);
  });

  it("shows an empty state and lets Clear Search restore topics and input focus", () => {
    const input = renderLibrary();
    fireEvent.change(input, { target: { value: "no-matching-topic-xyz" } });
    expect(screen.getByRole("heading", { name: "No topics found" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Common Cold" })).toBeNull();
    expect(screen.getByRole("status").textContent).toContain("0 topics found");

    const clearButton = screen.getByRole("button", { name: "Clear search" });
    clearButton.focus();
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
    expect(document.activeElement).toBe(input);
    expect(screen.queryByRole("heading", { name: "No topics found" })).toBeNull();
    for (const name of topicNames) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeTruthy();
    }
  });

  it("sets a descriptive title and restores the previous title on unmount", () => {
    const previousTitle = document.title;
    const view = render(<MemoryRouter><HealthLibrary /></MemoryRouter>);
    expect(document.title).toBe("Health Library | CarePath");
    view.unmount();
    expect(document.title).toBe(previousTitle);
  });
});
