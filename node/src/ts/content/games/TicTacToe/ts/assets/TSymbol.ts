import { GridCell } from "../../../../lib/assets/objects/GridCell.js";
import { Renderer } from "../../../../lib/display/Renderer.js";
import { Color } from "../../../../lib/util/Color.js";
import { Vector2 } from "../../../../lib/util/Vector2.js";
import { Grid } from "./Grid.js";

export type playerSymbol = "x" | "o";

export class TSymbol extends GridCell {
  symbol: playerSymbol;

  constructor(symbol: playerSymbol, grid?: Grid, gridPos?: Vector2) {
    super(grid, gridPos);

    this.symbol = symbol;
  }

  update(dt: number): void {}
  render(renderer: Renderer): void {
    renderer.setFillColor(Color.none);
    renderer.setLineWidth(10);

    switch (this.symbol) {
      case "x":
        const w = this.grid.cellWidth / 4;
        const h = this.grid.cellHeight / 4;

        const start1 = this.pos.subtract(new Vector2(w, h));
        const end1 = this.pos.subtract(new Vector2(-w, -h));
        renderer.renderLine(start1, end1);
        
        const start2 = this.pos.subtract(new Vector2(-w, h));
        const end2 = this.pos.subtract(new Vector2(w, -h));
        renderer.renderLine(start2, end2);
        break;
      case "o":
        renderer.renderEllipse(this.pos, this.grid.cellWidth / 4, this.grid.cellHeight / 4);
        break;
      default:
        console.warn("no symbol render defined!");
    }
  }
}
