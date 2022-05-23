import Game from "../../../../lib/games/Game.js";
import Canvas from "../../../../lib/display/Canvas.js";
import Shape from "./Shape.js";
import TetrisGrid from "./TetrisGrid.js";
import RechtangleWorld from "../../../../lib/assets/Worlds/RectangleWorld.js";
import GridWorld from "../../../../lib/assets/Worlds/GridWorld.js";

export default class TetrisGame extends Game {
  currentShape!: Shape;

  constructor(canvas: Canvas) {
    super(canvas);

    // this.worlds.set("main", new TetrisGrid(400, 800, 10, 20));
    this.worlds.set("main", new GridWorld(400, 400, 2, 2));
  }
}
