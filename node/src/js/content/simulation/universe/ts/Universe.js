import { Game } from "../../../lib/games/Game.js";
import { Color } from "../../../lib/util/Color.js";
export class Universe extends Game {
    gConst = 10;
    constructor(canvas) {
        super(canvas);
        this.setWorldBackground(Color.get("black"));
    }
    setGConst(gConst) {
        this.gConst = gConst;
    }
    getGConst() {
        return this.gConst;
    }
}
