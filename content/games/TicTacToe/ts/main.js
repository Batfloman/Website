"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_js_1 = require("../../../lib/display/Canvas.js");
const TicTacToeGame_js_1 = require("./assets/TicTacToeGame.js");
// ==========================================================================================
const canvas = new Canvas_js_1.Canvas(document.querySelector("canvas"));
const game = new TicTacToeGame_js_1.TicTacToeGame(canvas);
const grid = game.getWorld();
game.randomPlayerTurn();
// game.start();
