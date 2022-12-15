"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnBasedPlayer = void 0;
const Player_js_1 = require("./Player.js");
class TurnBasedPlayer extends Player_js_1.Player {
    constructor() {
        super(...arguments);
        this.turnFinished = false;
    }
    isUp() {
        this.turnFinished = false;
    }
}
exports.TurnBasedPlayer = TurnBasedPlayer;
