import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { healthTopics } from "../data/healthTopics";
import HealthLibrary from "./HealthLibrary";
import HealthTopic from "./HealthTopic";

function renderRoutes(path = "/health-library") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/health-library" element={<HealthLibrary />} />
        <Route path="/health-library/:slug" element={<HealthTopic />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Health topic articles", () => {
  it.each(healthTopics)("opens $name from its card and displays its article", (topic) => {
    renderRoutes();
    fireEvent.click(screen.getByRole("link", { name: new RegExp(`^${topic.name}\\b`) }));

    expect(screen.getByRole("heading", { level: 1, name: topic.name })).toBeTruthy();
    expect(document.title).toBe(`${topic.name} | CarePath`);
    for (const name of [
      "Overview", /^Common symptoms/, "General self-care information",
      "When to seek professional medical attention", "Emergency warning signs",
      "Sources and further reading",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeTruthy();
    }

    const sources = screen.getByRole("region", { name: "Sources and further reading" });
    const links = within(sources).getAllByRole("link");
    expect(links).toHaveLength(topic.article.sources.length);
    for (const source of topic.article.sources) {
      expect(links.some((link) => link.getAttribute("href") === source.url)).toBe(true);
    }
    expect(within(sources).getByText(/Sources checked:/).textContent).toContain(topic.article.sourcesChecked);
    const disclaimer = screen.getByRole("complementary", { name: "Medical disclaimer" });
    expect(disclaimer.textContent).toMatch(/not a diagnosis or personalized\s+treatment plan/);

    fireEvent.click(screen.getByRole("link", { name: "Back to Health Library" }));
    expect(screen.getByRole("heading", { level: 1, name: "Health Library" })).toBeTruthy();
    expect(document.title).toBe("Health Library | CarePath");
  });

  it("shows a friendly fallback for an invalid slug and can return to the library", () => {
    renderRoutes("/health-library/not-a-real-topic");
    expect(screen.getByRole("heading", { name: "Topic not found" })).toBeTruthy();
    expect(document.title).toBe("Topic not found | CarePath");
    expect(screen.getByRole("complementary", { name: "Medical disclaimer" })).toBeTruthy();
    fireEvent.click(screen.getByRole("link", { name: "Back to Health Library" }));
    expect(screen.getByRole("heading", { name: "Health Library" })).toBeTruthy();
  });
});
