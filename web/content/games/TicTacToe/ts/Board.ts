import { GridObject } from "../../../lib/assets/GridObject.js";
import { WorldObject } from "../../../lib/assets/WorldObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import { Color } from "../../../lib/util/Color.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Cell from "./Cell.js";

export default class Board extends GridObject<Cell> {
  constructor(pos: Vector2, width: number, height: number, xSize: number, ySize: number) {
    super(pos, width, height, xSize, ySize);
  }

  render(renderer: Renderer): void {
    super.render(renderer);

    renderer.setStrokeColor(Color.get("black"));
    renderer.setLineWidth(5);
    renderer.renderGrid(this.pos, this.xSize, this.ySize, this.xCellSize, this.yCellSize);
  }

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
    if (!(content instanceof WorldObject)) return;

    content.update(dt);
  }

  setCell(x: number, y: number, to: Cell | string) {
    if (to instanceof Cell) to.init(this.game, this.canvas);

    this.grid.set(x, y, to);
  }
}
