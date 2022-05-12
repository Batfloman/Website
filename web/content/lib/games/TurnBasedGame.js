import Util from "../util/Util.js";
import { Game } from "./Game.js";
export class TurnBasedGame extends Game {
    constructor(canvas, ...players) {
        super(canvas);
        this.players = players;
    }
    addPlayer(player) {
        if (this.players.includes(player))
            return;
        this.players.push(player);
        player.init(this);
    }
    tick() {
        super.tick();
    }
    randomPlayerTurn() {
        this.currentPlayer = Util.array.getRandomItem(this.players);
    }
    mixPlayerOrder() {
        let mixedPlayer = [];
        while (this.players.length > 0) {
            mixedPlayer.push(Util.array.removeItemAtIndex(this.players, Util.math.randomBetween(0, this.players.length - 1)));
        }
        this.players = mixedPlayer;
    }
    nextPlayer() {
        if (this.currentPlayer == undefined)
            this.randomPlayerTurn();
        else
            this.currentPlayer = Util.array.getItem(this.players, this.players.indexOf(this.currentPlayer) + 1);
    }
}
