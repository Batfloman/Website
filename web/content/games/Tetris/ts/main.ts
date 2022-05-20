import Canvas from "../../../lib/display/Canvas.js";
import TetrisGame from "./TetrisGame.js";
import TetrisGrid from "./TetrisGrid.js";

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new TetrisGame(canvas);

  const grid = new TetrisGrid();
  game.addObject(grid);

  game.tick();
}