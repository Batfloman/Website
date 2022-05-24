import Game from "../../../../lib/games/Game.js";
import Shape from "./Shape.js";
import TetrisGrid from "./TetrisGrid.js";
export default class TetrisGame extends Game {
    constructor(canvas) {
        super(canvas);
        this.worlds.set("main", new TetrisGrid(400, 800, 10, 20));
    }
    tick() {
        super.tick();
        if (!this.currentShape) {
            this.currentShape = Shape.getRandom();
        }
    }
}
