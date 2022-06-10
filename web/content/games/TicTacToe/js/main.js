import { Canvas } from "../../../lib/display/Canvas.js";
import { TicTacToeGame } from "./assets/TicTacToeGame.js";
import { TSymbol } from "./assets/TSymbol.js";
const canvas = new Canvas(document.querySelector("canvas"));
const game = new TicTacToeGame(canvas);
const grid = game.getWorld();
grid.addCell(new TSymbol("x"));
game.randomPlayerTurn();
game.start();
