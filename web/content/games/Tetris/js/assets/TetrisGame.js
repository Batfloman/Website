import { Game } from "../../../../lib/games/Game.js";
import { Shape } from "./Shape.js";
import { TetrisGrid } from "./TetrisGrid.js";
export class TetrisGame extends Game {
    constructor(canvas) {
        super(canvas);
        this.grid = new TetrisGrid(400, 800, 10, 20);
        this.worlds.set("main", this.grid);
    }
    tick() {
        if (!this.currentShape && this.grid) {
            this.currentShape = Shape.getRandom();
            this.currentShape.setGrid(this.grid);
            this.addObject(this.currentShape);
        }
        super.tick();
    }
}
