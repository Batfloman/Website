import { TurnBasedPlayer } from "../../../../lib/assets/players/TurnBasedPlayer.js";
import { playerSymbol } from "./TSymbol.js";

export class TicTacToePlayer extends TurnBasedPlayer {
  symbol: playerSymbol;

  constructor(symbol: playerSymbol) {
    super("player" + symbol.toString());

    this.symbol = symbol;
  }

  task(): void {
    throw new Error("Method not implemented.");
  }
}
