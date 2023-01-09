import { GridCell } from "../../../lib/assets/objects/GridCell.js";
import { Canvas } from "../../../lib/display/Canvas.js";
import { TicTacToeGame } from "./assets/TicTacToeGame.js";
import { Grid } from "./assets/Grid.js";
import { TSymbol } from "./assets/TSymbol.js";
import { Vector2 } from "../../../lib/util/Vector2.js";

// ==========================================================================================
const canvas = new Canvas(document.querySelector("canvas"));
const game = new TicTacToeGame(canvas);

const grid = game.getWorld() as Grid;

game.randomPlayerTurn();

// game.start();
