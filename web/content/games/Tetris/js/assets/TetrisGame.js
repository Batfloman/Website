import Game from "../../../../lib/games/Game.js";
import GridWorld from "../../../../lib/assets/Worlds/GridWorld.js";
export default class TetrisGame extends Game {
    constructor(canvas) {
        super(canvas);
        this.worlds.set("main", new GridWorld(400, 400, 2, 2));
    }
}
