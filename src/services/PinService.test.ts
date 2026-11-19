import { describe, expect, it } from "vitest";
import { pins } from "../data/pins";
import { PinService } from "./PinService";

describe("PinService", () => {
  it("returns the seeded pins", () => {
    expect(new PinService().getAll()).toBe(pins);
  });
});
