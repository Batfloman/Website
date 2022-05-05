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
        this.currentPlayer = Util.getRandomItem(this.players);
    }
    mixPlayerOrder() {
        let mixedPlayer = [];
        while (this.players.length > 0) {
            mixedPlayer.push(Util.removeItemAtIndex(this.players, Util.randomBetween(0, this.players.length - 1)));
        }
        this.players = mixedPlayer;
    }
    nextPlayer() {
        if (this.currentPlayer == undefined)
            this.randomPlayerTurn();
        else
            this.currentPlayer = Util.getItem(this.players, this.players.indexOf(this.currentPlayer) + 1);
    }
}
