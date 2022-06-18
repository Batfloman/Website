import { Canvas } from "../../../lib/display/Canvas.js";
import { TicTacToeGame } from "./assets/TicTacToeGame.js";
const canvas = new Canvas(document.querySelector("canvas"));
const game = new TicTacToeGame(canvas);
const grid = game.getWorld();
game.randomPlayerTurn();
