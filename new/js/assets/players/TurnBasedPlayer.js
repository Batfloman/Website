import { Player } from "./Player.js";
export class TurnBasedPlayer extends Player {
    turnFinished = false;
    isUp() {
        this.turnFinished = false;
    }
}
