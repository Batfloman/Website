import Canvas from "../display/Canvas.js";
import Player from "../players/Player.js";
import { Game } from "./Game.js";
export default class TurnBasedGame extends Game {
    players: Player[];
    currentPlayer: Player | undefined;
    constructor(canvas: Canvas, ...players: Player[]);
    addPlayer(player: Player): void;
    randomPlayerTurn(): void;
    nextPlayer(): void;
    tick(): void;
}
