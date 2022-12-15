import { Canvas } from "../../../../lib/display/Canvas.js";
import { TurnBasedGame } from "../../../../lib/games/TurnBasedGame.js";
import { Grid } from "./Grid.js";

export class TicTacToeGame extends TurnBasedGame {
  constructor(canvas: Canvas) {
    super(canvas);

    this.setWorld("main", new Grid(canvas, 3, 3));
  }

  startRound() {}
}
