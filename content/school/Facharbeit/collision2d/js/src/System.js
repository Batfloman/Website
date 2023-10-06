import { Game } from "../../../../../lib/games/Game.js";
import { Color } from "../../../../../lib/util/Color.js";
export class System extends Game {
    constructor(canvas) {
        super(canvas);
        this.speedMult = 1;
        this.setWorldBackground(Color.get("red"));
    }
}
