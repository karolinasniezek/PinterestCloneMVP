import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Pin } from "../types/Pin";
import PinModal from "./PinModal";

const existingPin: Pin = {
  id: 42,
  title: "Original title",
  description: "Original description",
  author: "Alex",
  imageUrl: "/original.png",
  isFavorite: true,
};

describe("PinModal", () => {
  it("does not render while closed", () => {
    const { container } = render(
      <PinModal
        isOpen={false}
        onClose={vi.fn()}
        onSave={vi.fn()}
        editingPin={null}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("validates required fields before saving", () => {
    const onSave = vi.fn();
    const alert = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <PinModal
        isOpen
        onClose={vi.fn()}
        onSave={onSave}
        editingPin={null}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(alert).toHaveBeenCalledWith("Please fill in all fields.");
    expect(onSave).not.toHaveBeenCalled();
    alert.mockRestore();
  });

  it("saves edited details while preserving the rest of the pin", () => {
    const onSave = vi.fn();
    const onClose = vi.fn();

    const { container } = render(
      <PinModal
        isOpen
        onClose={onClose}
        onSave={onSave}
        editingPin={existingPin}
      />
    );

    fireEvent.change(screen.getByDisplayValue(existingPin.title), {
      target: { value: "Updated title" },
    });
    fireEvent.change(screen.getByDisplayValue(existingPin.description), {
      target: { value: "Updated description" },
    });
    fireEvent.click(container.querySelector(".modal-actions button:last-child")!);

    expect(onSave).toHaveBeenCalledWith({
      ...existingPin,
      title: "Updated title",
      description: "Updated description",
    });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("creates a pin from the completed form and uploaded image", async () => {
    const onSave = vi.fn();
    const onClose = vi.fn();

    const { container } = render(
      <PinModal
        isOpen
        onClose={onClose}
        onSave={onSave}
        editingPin={null}
      />
    );

    fireEvent.change(container.querySelector('input[type="file"]')!, {
      target: {
        files: [new File(["image"], "pin.png", { type: "image/png" })],
      },
    });
    const inputs = container.querySelectorAll(".form-group input");
    fireEvent.change(inputs[0], {
      target: { value: "New pin" },
    });
    fireEvent.change(container.querySelector("textarea")!, {
      target: { value: "A new description" },
    });
    fireEvent.change(inputs[1], {
      target: { value: "Jordan" },
    });

    await waitFor(() => expect(screen.getByAltText("Preview")).toBeTruthy());
    fireEvent.click(container.querySelector(".modal-actions button:last-child")!);

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New pin",
        description: "A new description",
        author: "Jordan",
        imageUrl: expect.stringMatching(/^data:image\/png;base64,/),
        isFavorite: false,
      })
    );
    expect(onClose).toHaveBeenCalledOnce();
  });
});
