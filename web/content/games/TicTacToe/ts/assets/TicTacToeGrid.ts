import { GridWorld } from "../../../../lib/assets/worlds/GridWorld.js";
import { Renderer } from "../../../../lib/display/Renderer.js";
import { Color } from "../../../../lib/util/Color.js";
import { Input } from "../../../../lib/input/Input.js";
import { Canvas } from "../../../../lib/display/Canvas.js";

export class TicTacToeGrid extends GridWorld {
  canvas: Canvas;

  constructor(canvas: Canvas, xSize: number, ySize: number) {
    super(canvas.width, canvas.height, xSize, ySize);

    this.canvas = canvas;

    Input.newEventListener("resize", this, () => {
      this.width = this.canvas.width;
      this.height = this.canvas.height;

      this.xCellSize = this.width / this.xSize;
      this.yCellSize = this.height / this.ySize;
    });
  }

  render(renderer: Renderer): void {
    renderer.setStrokeColor(Color.get("black"));
    renderer.setLineWidth(5);
    super.render(renderer);
  }
}
