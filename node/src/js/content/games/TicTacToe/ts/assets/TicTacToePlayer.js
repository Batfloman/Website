import { TurnBasedPlayer } from "../../../../lib/assets/players/TurnBasedPlayer.js";
export class TicTacToePlayer extends TurnBasedPlayer {
    symbol;
    constructor(symbol) {
        super("player" + symbol.toString());
        this.symbol = symbol;
    }
    task() {
        throw new Error("Method not implemented.");
    }
}
