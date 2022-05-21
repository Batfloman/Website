import { GridObject } from "../../../lib/assets/GridObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import { Color } from "../../../lib/util/Color.js";
import Block from "./Block.js";

export default class TetrisGrid extends GridObject<Block> {
  renderCell(x: number, y: number, renderer: Renderer): void {
  }
  updateCell(x: number, y: number, dt: number): void {
  }

  render(renderer: Renderer): void {
    super.render(renderer);

    renderer.setStrokeColor(new Color(232, 232, 232));
    renderer.setLineWidth(1.5);
    renderer.renderGrid(this.pos, this.xSize, this.ySize, this.xCellSize, this.yCellSize);
  }

}
