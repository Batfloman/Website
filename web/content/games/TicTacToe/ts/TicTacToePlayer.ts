import { TurnBasedPlayer } from "../../../lib/players/TurnBasedPlayer.js";

type playerSymbol = "x" | "o";

export default class TicTacToePlayer extends TurnBasedPlayer {
  symbol: playerSymbol;

  constructor(symbol: playerSymbol) {
    super("player" + symbol.toString());

    this.symbol = symbol;
  }
  
  task(): void {
    throw new Error("Method not implemented.");
  }
}