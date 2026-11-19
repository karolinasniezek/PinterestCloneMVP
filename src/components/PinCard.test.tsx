import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Pin } from "../types/Pin";
import PinCard from "./PinCard";

const pin: Pin = {
  id: 1,
  title: "A favorite pin",
  description: "Pin description",
  author: "Alex",
  imageUrl: "/pin.png",
  isFavorite: true,
};

describe("PinCard", () => {
  it("renders pin details and the favorite state", () => {
    render(
      <PinCard
        pin={pin}
        onFavorite={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByRole("img", { name: pin.title }).getAttribute("src")
    ).toBe(pin.imageUrl);
    expect(screen.getByText(pin.description)).toBeTruthy();
    expect(screen.getByText(`by ${pin.author}`)).toBeTruthy();
    expect(screen.getByText("❤️")).toBeTruthy();
  });

  it("delegates favorite, edit, and delete actions", () => {
    const onFavorite = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const { container } = render(
      <PinCard
        pin={pin}
        onFavorite={onFavorite}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    fireEvent.click(container.querySelector(".favorite-btn")!);
    fireEvent.click(container.querySelector(".edit-btn")!);
    fireEvent.click(container.querySelector(".delete-btn")!);

    expect(onFavorite).toHaveBeenCalledWith(pin.id);
    expect(onEdit).toHaveBeenCalledWith(pin);
    expect(onDelete).toHaveBeenCalledWith(pin.id);
  });
});
