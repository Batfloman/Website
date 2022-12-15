"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnBasedGame = void 0;
const Player_js_1 = require("../assets/players/Player.js");
const Util_js_1 = require("../util/Util.js");
const Game_js_1 = require("./Game.js");
class TurnBasedGame extends Game_js_1.Game {
    constructor(canvas, players) {
        super(canvas);
        if (!players)
            this.players = [];
        else if (players instanceof Player_js_1.Player)
            this.players = [players];
        else
            this.players = players;
        this.currentPlayer = this.randomPlayerTurn();
    }
    tick() {
        super.tick();
        if (Util_js_1.Util.array.isEmpty(this.players))
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
        this.currentPlayer = Util_js_1.Util.array.getRandomItem(this.players);
        return this.currentPlayer;
    }
    mixPlayerOrder() {
        let mixedPlayer = [];
        while (this.players.length > 0) {
            mixedPlayer.push(Util_js_1.Util.array.removeItemAtIndex(this.players, Util_js_1.Util.math.random.between(0, this.players.length - 1)));
        }
        this.players = mixedPlayer;
    }
    nextPlayer() {
        if (!this.currentPlayer)
            this.randomPlayerTurn();
        else
            this.currentPlayer = Util_js_1.Util.array.getItem(this.players, this.players.indexOf(this.currentPlayer) + 1);
        return this.currentPlayer;
    }
}
exports.TurnBasedGame = TurnBasedGame;
