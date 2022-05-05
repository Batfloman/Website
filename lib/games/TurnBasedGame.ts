import Canvas from "../display/Canvas.js";
import { Player } from "../players/Player.js";
import Util from "../util/Util.js";
import { Game } from "./Game.js";

export abstract class TurnBasedGame extends Game {
  protected players: Player[];
  protected currentPlayer: Player | undefined;

  constructor(canvas: Canvas, ...players: Player[]) {
    super(canvas);
    this.players = players;
  }

  addPlayer(player: Player): void {
    if (this.players.includes(player)) return;

    this.players.push(player);
    player.init(this);
  }

  tick() {
    super.tick();
  }

  randomPlayerTurn(): void {
    this.currentPlayer = Util.getRandomItem(this.players);
  }

  mixPlayerOrder(): void {
    let mixedPlayer = [];
    while (this.players.length > 0) {
      mixedPlayer.push(
        Util.removeItemAtIndex(
          this.players,
          Util.randomBetween(0, this.players.length - 1)
        )
      );
    }
    this.players = mixedPlayer;
  }

  nextPlayer(): void {
    if (this.currentPlayer == undefined) this.randomPlayerTurn();
    else
      this.currentPlayer = Util.getItem(
        this.players,
        this.players.indexOf(this.currentPlayer) + 1
      );
  }
}
