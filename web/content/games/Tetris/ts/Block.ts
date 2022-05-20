import { GridCell } from "../../../lib/assets/GridCell.js";
import Renderer from "../../../lib/display/Renderer.js";

export default class Block extends GridCell {
  update2(dt: number): void {
    throw new Error("Method not implemented.");
  }
  render(renderer: Renderer): void {
    throw new Error("Method not implemented.");
  }
}