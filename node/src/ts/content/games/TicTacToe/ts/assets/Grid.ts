import { GridWorld } from "../../../../lib/assets/worlds/GridWorld.js";
import { Renderer } from "../../../../lib/display/Renderer.js";
import { Color } from "../../../../lib/util/Color.js";
import { Input } from "../../../../lib/input/Input.js";
import { Canvas } from "../../../../lib/display/Canvas.js";
import { Vector2 } from "../../../../lib/util/Vector2.js";
import { TicTacToeGame } from "./TicTacToeGame.js";
import { TSymbol } from "./TSymbol.js";

export class Grid extends GridWorld {
  canvas: Canvas;

  constructor(canvas: Canvas, xSize: number, ySize: number) {
    super(canvas.width, canvas.height, xSize, ySize);

    this.canvas = canvas;

    Input.newEventListener("resize", this, () => {
      this.width = this.canvas.width;
      this.height = this.canvas.height;

      this.cellWidth = this.width / this.xSize;
      this.cellHeight = this.height / this.ySize;
    });
  }

  clicked(worldPos: Vector2): void {
    const cell = this.findGridPosition(worldPos);

    if(this.grid.isCellEmpty(cell.x, cell.y)) {
      this.addCell(new TSymbol("x", this, cell));
    }
  }

  render(renderer: Renderer): void {
    renderer.setStrokeColor(Color.get("black"));
    renderer.setLineWidth(5);
    super.render(renderer);
  }
}
