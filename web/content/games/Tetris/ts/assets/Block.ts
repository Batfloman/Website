import { GridCell } from "../../../../lib/assets/objects/GridCell.js";
import { Renderer } from "../../../../lib/display/Renderer.js";
import { Color } from "../../../../lib/util/Color.js";

export class Block extends GridCell {
  color: Color = Color.get("white");

  update2(dt: number): void {}
  render(renderer: Renderer): void {
    renderer.setStrokeColor(Color.none)
    renderer.setFillColor(this.color);
    renderer.renderRectangle(this.getWorldPos(), this.grid.xCellSize, this.grid.yCellSize);
    
    renderer.setFillColor(new Color(255, 255, 255, 50));
    renderer.renderRectangle(this.getWorldPos(), this.grid.xCellSize / 2, this.grid.yCellSize / 2);
  }
}
