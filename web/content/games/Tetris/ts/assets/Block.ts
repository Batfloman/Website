import { GridCell } from "../../../../lib/assets/objects/GridCell.js";
import { Renderer } from "../../../../lib/display/Renderer.js";
import { Rectangle } from "../../../../lib/physic/boundingBox/Rectangle.js";
import { Vector2 } from "../../../../lib/util/Vector2.js";

export class Block extends GridCell {
  constructor() {
    super(new Vector2(), new Rectangle(0, 0), 0);
  }

  update2(dt: number): void {}
  render(renderer: Renderer): void {
    renderer.renderRectangle(this.getWorldPos(), this.grid.xCellSize, this.grid.yCellSize);
  }
}
