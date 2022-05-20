import { GridObject } from "../../../lib/assets/GridObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import Block from "./Block.js";

export default class TetrisGrid extends GridObject<Block> {
  renderCell(x: number, y: number, renderer: Renderer): void {
    throw new Error("Method not implemented.");
  }
  updateCell(x: number, y: number, dt: number): void {
    throw new Error("Method not implemented.");
  }

}
