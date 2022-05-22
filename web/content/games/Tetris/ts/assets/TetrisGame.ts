import Game from "../../../../lib/assets/games/Game.js";
import GridWorld from "../../../../lib/assets/Worlds/GridWorld.js";
import Canvas from "../../../../lib/display/Canvas.js";
import Shape from "./Shape.js";

export default class TetrisGame extends Game {
  currentShape!: Shape;

  constructor(canvas: Canvas) {
    super(canvas);

    this.worlds.set("main", new GridWorld(400, 800, 10, 20));
  }
}
