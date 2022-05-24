import Game from "../../../../lib/games/Game.js";
import Canvas from "../../../../lib/display/Canvas.js";
import Shape from "./Shape.js";
import TetrisGrid from "./TetrisGrid.js";

export default class TetrisGame extends Game {
  currentShape!: Shape;

  constructor(canvas: Canvas) {
    super(canvas);

    this.worlds.set("main", new TetrisGrid(400, 800, 10, 20));
  }

  tick(): void {
    super.tick();

    if(!this.currentShape) {
      this.currentShape = Shape.getRandom();
    }
  }
}
