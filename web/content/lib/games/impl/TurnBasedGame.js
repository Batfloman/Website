import { Player } from "../../players/Player.js";
import Util from "../../util/Util.js";
import { Game } from "../Game.js";
export class TurnBasedGame extends Game {
    constructor(canvas, players) {
        super(canvas);
        if (!players)
            this.players = [];
        else if (players instanceof Player)
            this.players = [players];
        else
            this.players = players;
        this.currentPlayer = this.randomPlayerTurn();
    }
    tick() {
        super.tick();
        if (Util.array.isEmpty(this.players))
            return;
        if (this.currentPlayer.turnFinished) {
            this.nextPlayer();
            this.currentPlayer.isUp();
        }
    }
    addPlayer(player) {
        if (this.players.includes(player))
            return;
        this.players.push(player);
        player.init(this);
    }
    randomPlayerTurn() {
        this.currentPlayer = Util.array.getRandomItem(this.players);
        return this.currentPlayer;
    }
    mixPlayerOrder() {
        let mixedPlayer = [];
        while (this.players.length > 0) {
            mixedPlayer.push(Util.array.removeItemAtIndex(this.players, Util.math.randomBetween(0, this.players.length - 1)));
        }
        this.players = mixedPlayer;
    }
    nextPlayer() {
        if (!this.currentPlayer)
            this.randomPlayerTurn();
        else
            this.currentPlayer = Util.array.getItem(this.players, this.players.indexOf(this.currentPlayer) + 1);
        return this.currentPlayer;
    }
}
