import Canvas from "../../../lib/display/Canvas.js";
import Game from "../../../lib/games/Game.js";
import { Color } from "../../../lib/util/Color.js";

export default class Universe extends Game {
  gConst: number = 10;

  constructor(canvas: Canvas) {
    super(canvas);

    this.setWorldBackground(Color.get("black"));
  }

  setGConst(gConst: number) {
    this.gConst = gConst;
  }

  getGConst() {
    return this.gConst;
  }
}