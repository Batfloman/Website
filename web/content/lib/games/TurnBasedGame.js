import Util from "../util/Util.js";
import { Game } from "./Game.js";
export default class TurnBasedGame extends Game {
    constructor(canvas, ...players) {
        super(canvas);
        this.players = players;
    }
    addPlayer(player) {
        if (this.players.includes(player))
            return;
        this.players.push(player);
    }
    randomPlayerTurn() {
        this.currentPlayer = Util.getRandomItem(this.players);
    }
    nextPlayer() {
        if (this.currentPlayer == undefined)
            this.randomPlayerTurn();
        else
            this.currentPlayer = Util.getItem(this.players, this.players.indexOf(this.currentPlayer) + 1);
    }
    tick() {
    }
}
