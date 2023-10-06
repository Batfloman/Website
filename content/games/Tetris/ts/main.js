"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_js_1 = require("../../../lib/display/Canvas.js");
const TetrisGame_js_1 = require("./assets/TetrisGame.js");
window.onload = () => {
    const canvas = new Canvas_js_1.Canvas(document.querySelector("canvas"));
    const game = new TetrisGame_js_1.TetrisGame(canvas);
    // const block = new Block(game.getWorld("main") as TetrisGrid, new Vector2(0, 0));
    // game.addObject(block);
    game.start();
};
