import Game from "../../../../lib/games/Game.js";
import { Color } from "../../../../lib/util/Color.js";
export default class System extends Game {
    constructor(canvas) {
        super(canvas);
        this.setWorldBackground("main", Color.get("red"));
    }
}
