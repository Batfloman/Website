"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name) {
        if (!name)
            name = "Player" + Player.counter++;
        this.name = name;
    }
    init(game) {
        this.game = game;
    }
}
exports.Player = Player;
Player.counter = 0;
