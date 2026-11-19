import { pins } from "../data/pins";
import type { Pin } from "../types/Pin";

export class PinService {
  getAll(): Pin[] {
    return pins;
  }
}
