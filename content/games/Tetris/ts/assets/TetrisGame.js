"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrisGame = void 0;
const Game_js_1 = require("../../../../lib/games/Game.js");
const Shape_js_1 = require("./Shape.js");
const TetrisGrid_js_1 = require("./TetrisGrid.js");
const Vector2_js_1 = require("../../../../lib/util/Vector2.js");
class TetrisGame extends Game_js_1.Game {
    constructor(canvas) {
        super(canvas);
        this.grid = new TetrisGrid_js_1.TetrisGrid(400, 800, 10, 20);
        this.worlds.set("main", this.grid);
    }
    tick() {
        if (!this.currentShape && this.grid) {
            this.newCurrentShape();
        }
        super.tick();
    }
    newCurrentShape() {
        this.currentShape = Shape_js_1.Shape.getRandom(new Vector2_js_1.Vector2(Math.floor((this.grid.xSize - 1) / 2), 0));
        this.currentShape.setGrid(this.grid);
        this.addObject(this.currentShape);
    }
}
exports.TetrisGame = TetrisGame;
