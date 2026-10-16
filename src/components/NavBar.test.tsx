import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("updates the search term", () => {
    const onSearchChange = vi.fn();

    render(
      <NavBar
        searchTerm=""
        onSearchChange={onSearchChange}
        onAddPin={vi.fn()}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search inspiration..."), {
      target: { value: "cats" },
    });

    expect(onSearchChange).toHaveBeenCalledWith("cats");
  });

  it("opens the add-pin flow", () => {
    const onAddPin = vi.fn();

    render(
      <NavBar searchTerm="" onSearchChange={vi.fn()} onAddPin={onAddPin} />
    );

    fireEvent.click(screen.getByRole("button", { name: "+ Add Pin" }));

    expect(onAddPin).toHaveBeenCalledOnce();
  });
});
