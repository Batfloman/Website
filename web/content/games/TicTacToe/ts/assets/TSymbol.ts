import { GridCell } from "../../../../lib/assets/objects/GridCell.js";
import { Renderer } from "../../../../lib/display/Renderer.js";
import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Grid } from "./Grid.js";

export class TSymbol extends GridCell {
  text: string;

  constructor(text: string, grid?: Grid, gridPos?: Vector2) {
    super(grid, gridPos);

    this.text = text;
  }

  update2(dt: number): void {}
  render(renderer: Renderer): void {
    renderer.renderText(this.getWorldPos(), this.text);
  }
}
