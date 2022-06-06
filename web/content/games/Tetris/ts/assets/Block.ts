import { GridCell } from "../../../../lib/assets/objects/GridCell.js";
import { Renderer } from "../../../../lib/display/Renderer.js";
import { Color } from "../../../../lib/util/Color.js";

export class Block extends GridCell {
  color: Color = Color.get("white");

  update2(dt: number): void {}
  render(renderer: Renderer): void {
    renderer.setStrokeColor(Color.none)
    renderer.setFillColor(this.color);
    renderer.renderRectangle(this.getWorldPos(), this.grid.cellWidth, this.grid.cellHeight);
    
    renderer.setFillColor(new Color(255, 255, 255, 50));
    renderer.renderRectangle(this.getWorldPos(), this.grid.cellWidth / 2, this.grid.cellHeight / 2);
  }
}
