import { Canvas } from "../../../../old/web/content/lib/display/Canvas.js";
import { Game } from "../../../../old/web/content/lib/games/Game.js";
import { Color } from "../../../../old/web/content/lib/util/Color.js";

export class System extends Game {
  speedMult: number = 1;

  constructor(canvas: Canvas) {
    super(canvas);

    this.setWorldBackground(Color.get("red"));
  }
}
