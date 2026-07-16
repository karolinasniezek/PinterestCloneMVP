import { boards } from "../data/boards";
import type { Board } from "../types/Board";

export class BoardService {
  getAll(): Board[] {
    return boards;
  }
}
