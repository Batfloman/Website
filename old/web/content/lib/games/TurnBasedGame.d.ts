import { Canvas } from "../display/Canvas.js";
import { TurnBasedPlayer } from "../assets/players/TurnBasedPlayer.js";
import { Game } from "./Game.js";
export declare class TurnBasedGame extends Game {
    protected players: TurnBasedPlayer[];
    protected currentPlayer: TurnBasedPlayer;
    constructor(canvas: Canvas, players?: TurnBasedPlayer | TurnBasedPlayer[]);
    tick(): void;
    addPlayer(player: TurnBasedPlayer): void;
    randomPlayerTurn(): TurnBasedPlayer;
    mixPlayerOrder(): void;
    nextPlayer(): TurnBasedPlayer;
}
