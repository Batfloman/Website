"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_js_1 = require("../../../lib/display/Canvas.js");
const Game_js_1 = require("../../../lib/games/Game.js");
const Board_js_1 = require("./Board.js");
window.onload = () => {
    const canvas = new Canvas_js_1.Canvas(document.querySelector("canvas"));
    const game = new Game_js_1.Game(canvas);
    game.setWorld("main", new Board_js_1.Board(canvas, 25, 25));
    game.start();
};
