import { Game } from "../../../../lib/games/Game.js";
import { Canvas } from "../../../../lib/display/Canvas.js";
import { Shape } from "./Shape.js";
import { TetrisGrid } from "./TetrisGrid.js";
import { Vector2 } from "../../../../lib/util/Vector2.js";

export class TetrisGame extends Game {
  currentShape!: Shape;
  grid!: TetrisGrid;

  constructor(canvas: Canvas) {
    super(canvas);

    this.grid = new TetrisGrid(400, 800, 10, 20);
    this.worlds.set("main", this.grid);
  }

  tick(): void {
    if(!this.currentShape && this.grid) {
      this.newCurrentShape();
    }

    super.tick();
  }

  newCurrentShape() {
    this.currentShape = Shape.getRandom(new Vector2(Math.floor((this.grid.xSize - 1) / 2), 0));
    this.currentShape.setGrid(this.grid);
    this.addObject(this.currentShape);
  }
}
