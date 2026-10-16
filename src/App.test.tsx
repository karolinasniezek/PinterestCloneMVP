import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders pins and filters by title, description, or author", () => {
    render(<App />);

    expect(screen.getByText("Blue Eyed Dalmatian")).toBeTruthy();
    fireEvent.change(screen.getByPlaceholderText("Search inspiration..."), {
      target: { value: "Sophia" },
    });

    expect(screen.getByText("Cute Devon Rex Kitten")).toBeTruthy();
    expect(screen.queryByText("Blue Eyed Dalmatian")).toBeNull();
  });

  it("toggles a pin favorite and persists the updated pins", () => {
    const { container } = render(<App />);

    fireEvent.click(container.querySelector(".favorite-btn")!);

    expect(container.querySelector(".favorite-btn")?.textContent).toBe("❤️");
    expect(JSON.parse(localStorage.getItem("pins")!)[0].isFavorite).toBe(true);
  });

  it("deletes a pin after confirmation", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<App />);

    fireEvent.click(screen.getAllByRole("button").find(
      (button) => button.className === "delete-btn"
    )!);

    expect(screen.queryByText("Blue Eyed Dalmatian")).toBeNull();
    expect(JSON.parse(localStorage.getItem("pins")!)).toHaveLength(10);
    vi.restoreAllMocks();
  });
});
