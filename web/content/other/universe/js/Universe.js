import Game from "../../../lib/games/Game.js";
import { Color } from "../../../lib/util/Color.js";
export default class Universe extends Game {
    constructor(canvas) {
        super(canvas);
        this.gConst = 10;
        this.setWorldBackground("main", Color.get("black"));
    }
    setGConst(gConst) {
        this.gConst = gConst;
    }
    getGConst() {
        return this.gConst;
    }
}
