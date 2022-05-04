import Canvas from "../display/Canvas.js";
import Player from "../players/Player.js";
import Util from "../util/Util.js";
import { Game } from "./Game.js";

export default class TurnBasedGame extends Game {
  players: Player[];
  currentPlayer: Player | undefined;

  constructor(canvas: Canvas, ...players: Player[]) {
    super(canvas);
    this.players = players;
  }

  addPlayer(player: Player): void {
    if (this.players.includes(player)) return;

    this.players.push(player);
  }

  randomPlayerTurn(): void {
    this.currentPlayer = Util.getRandomItem(this.players);
  }

  nextPlayer(): void {
    if (this.currentPlayer == undefined) this.randomPlayerTurn();
    else
      this.currentPlayer = Util.getItem(
        this.players,
        this.players.indexOf(this.currentPlayer) + 1
      );
  }

  tick() {
    
  }
}
