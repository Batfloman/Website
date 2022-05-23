import { TurnBasedPlayer } from "../../../../lib/assets/players/TurnBasedPlayer.js";
export default class TicTacToePlayer extends TurnBasedPlayer {
    constructor(symbol) {
        super("player" + symbol.toString());
        this.symbol = symbol;
    }
    task() {
        throw new Error("Method not implemented.");
    }
}
