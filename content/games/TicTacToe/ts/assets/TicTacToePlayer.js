"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToePlayer = void 0;
const TurnBasedPlayer_js_1 = require("../../../../lib/assets/players/TurnBasedPlayer.js");
class TicTacToePlayer extends TurnBasedPlayer_js_1.TurnBasedPlayer {
    constructor(symbol) {
        super("player" + symbol.toString());
        this.symbol = symbol;
    }
    task() {
        throw new Error("Method not implemented.");
    }
}
exports.TicTacToePlayer = TicTacToePlayer;
