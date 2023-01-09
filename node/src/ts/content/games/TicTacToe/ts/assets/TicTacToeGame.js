"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToeGame = void 0;
const TurnBasedGame_js_1 = require("../../../../lib/games/TurnBasedGame.js");
const Grid_js_1 = require("./Grid.js");
class TicTacToeGame extends TurnBasedGame_js_1.TurnBasedGame {
    constructor(canvas) {
        super(canvas);
        this.setWorld("main", new Grid_js_1.Grid(canvas, 3, 3));
    }
    startRound() { }
}
exports.TicTacToeGame = TicTacToeGame;
