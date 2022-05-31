import { Canvas } from "../../../../../lib/display/Canvas.js";
import { Game } from "../../../../../lib/games/Game.js";
import { Color } from "../../../../../lib/util/Color.js";

export class System extends Game {
  constructor(canvas: Canvas) {
    super(canvas);

    this.setWorldBackground(Color.get("red"));
  }
}