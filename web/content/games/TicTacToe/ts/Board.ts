import { GridObject } from "../../../lib/assets/GridObject.js";
import { WorldObject } from "../../../lib/assets/WorldObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import Cell from "./Cell.js";

export default class Board extends GridObject<Cell> {
  renderCell(x: number, y: number, renderer: Renderer): void {
    const content = this.grid.get(x, y);
    if (content instanceof WorldObject) {
      content.render(renderer);
    }
    if (typeof content == "string") {
      renderer.renderText(this.pos, content);
    }
  }

  updateCell(x: number, y: number, dt: number): void {
    const content = this.grid.get(x, y);
    if(!(content instanceof WorldObject)) return;

    content.update(dt);
  }
  
  setCell(x: number, y: number, to: Cell | string) {
    if(to instanceof Cell) to.init(this.game, this.canvas);

    this.grid.set(x, y, to);
  }
}
