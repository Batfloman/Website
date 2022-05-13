import Canvas from "../display/Canvas.js";
import { Player } from "../players/Player.js";
import { Game } from "./Game.js";
export declare abstract class TurnBasedGame extends Game {
    protected players: Player[];
    protected currentPlayer: Player | undefined;
    constructor(canvas: Canvas, ...players: Player[]);
    addPlayer(player: Player): void;
    randomPlayerTurn(): void;
    mixPlayerOrder(): void;
    nextPlayer(): void;
}
