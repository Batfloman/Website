import { TurnBasedGame } from "../../../../lib/games/TurnBasedGame.js";
import { Grid } from "./Grid.js";
export class TicTacToeGame extends TurnBasedGame {
    constructor(canvas) {
        super(canvas);
        this.worlds.set("main", new Grid(canvas, 3, 3));
    }
    startRound() { }
}
