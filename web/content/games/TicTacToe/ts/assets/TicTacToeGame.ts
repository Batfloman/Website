import Canvas from "../../../../lib/display/Canvas.js";
import TurnBasedGame from "../../../../lib/games/TurnBasedGame.js";
import TicTacToeGrid from "./TicTacToeGrid.js";

export default class TicTacToeGame extends TurnBasedGame {
  constructor(canvas: Canvas) {
    super(canvas);

    this.worlds.set("main", new TicTacToeGrid(canvas, 3, 3));
  }

  startRound() {

  }
}