import Game from "../../../../lib/games/Game.js";
import TetrisGrid from "./TetrisGrid.js";
export default class TetrisGame extends Game {
    constructor(canvas) {
        super(canvas);
        this.worlds.set("main", new TetrisGrid(400, 800, 10, 20));
    }
}
