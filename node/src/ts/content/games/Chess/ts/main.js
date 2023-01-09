"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TurnBasedPlayer_js_1 = require("../../../lib/assets/players/TurnBasedPlayer.js");
const Canvas_js_1 = require("../../../lib/display/Canvas.js");
const TurnBasedGame_js_1 = require("../../../lib/games/TurnBasedGame.js");
const GridWorld_js_1 = require("../../../lib/assets/worlds/GridWorld.js");
const htmlCanvas = document.querySelector("#game-board");
window.onload = () => {
    if (!(htmlCanvas instanceof HTMLCanvasElement)) {
        throw new Error("Canvas not found!");
        return;
    }
    const whitePlayer = new TurnBasedPlayer_js_1.TurnBasedPlayer();
    const blackPlayer = new TurnBasedPlayer_js_1.TurnBasedPlayer();
    const canvas = new Canvas_js_1.Canvas(htmlCanvas);
    const game = new TurnBasedGame_js_1.TurnBasedGame(canvas, [whitePlayer, blackPlayer]);
    const world = new GridWorld_js_1.GridWorld(canvas.width, canvas.height, 8, 8);
    console.log(world);
    game.setWorld("main", world);
    game.setCamaraScaleLock(true);
    game.setCamaraMovementLock(true);
};
