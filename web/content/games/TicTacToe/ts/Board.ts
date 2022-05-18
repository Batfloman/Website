import { GridObject } from "../../../lib/assets/GridObject.js"; 
import { WorldObject } from "../../../lib/assets/WorldObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import Cell from "./Cell.js";

export default class Board extends GridObject<Cell> {
  renderCell(x: number, y: number, renderer: Renderer): void {
    const content = this.grid.get(x, y);
    if(content instanceof WorldObject) {
      content.render(renderer);
    }
    if(typeof content == "string") {
      renderer.renderText(this.pos, content);
    }
  }
  update2(dt: number): void {
    throw new Error("Method not implemented.");
  }
}