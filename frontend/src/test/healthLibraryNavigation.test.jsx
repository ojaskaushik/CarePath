import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "../App";
import { clearAuthSession } from "../services/authSession";

beforeEach(() => {
  clearAuthSession();
  // Run the real guest-session flow without contacting a backend.
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 401 }));
});

function renderApp(path = "/") {
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
}

describe("Health Library integration", () => {
  it("allows a guest to open the library directly without signing in", async () => {
    renderApp("/health-library");
    expect(await screen.findByRole("heading", { level: 1, name: "Health Library" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Log In" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Sign Up" })).toBeTruthy();
  });

  it("navigates to the library using the desktop Navbar link", async () => {
    renderApp();
    const link = await screen.findByRole("link", { name: "Health Library", exact: true });
    expect(link.getAttribute("href")).toBe("/health-library");
    fireEvent.click(link);
    expect(screen.getByRole("heading", { level: 1, name: "Health Library" })).toBeTruthy();
    expect(link.getAttribute("aria-current")).toBe("page");
  });

  it("opens the library from the mobile menu and closes the menu", async () => {
    renderApp();
    const toggle = await screen.findByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    const menuId = toggle.getAttribute("aria-controls");
    const menu = document.getElementById(menuId);
    expect(nav.contains(menu)).toBe(true);
    const link = within(menu).getByRole("link", { name: "Health Library", exact: true });
    expect(link.getAttribute("href")).toBe("/health-library");
    fireEvent.click(link);
    expect(screen.getByRole("heading", { level: 1, name: "Health Library" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded")).toBe("false");
    expect(document.getElementById(menuId)).toBeNull();
  });

  it.each([
    /^Health Library Browse six source-backed articles/,
    "Browse six educational health articles",
  ])("opens the library from homepage link %s", async (name) => {
    renderApp();
    const link = await screen.findByRole("link", { name });
    expect(link.getAttribute("href")).toBe("/health-library");
    fireEvent.click(link);
    expect(screen.getByRole("heading", { level: 1, name: "Health Library" })).toBeTruthy();
  });
});
