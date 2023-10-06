import { Player } from "./Player.js";
export declare abstract class TurnBasedPlayer extends Player {
    turnFinished: boolean;
    isUp(): void;
    abstract task(): void;
}
