import Canvas from "../../../lib/display/Canvas.js";
import Vector2 from "../../../lib/util/Vector2.js";
import TetrisGame from "./TetrisGame.js";
import TetrisGrid from "./TetrisGrid.js";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new TetrisGame(canvas);
    const gridWidth = 10;
    const gridHeight = 20;
    const gridCellWidth = 40;
    const grid = new TetrisGrid(new Vector2(), gridWidth * gridCellWidth, gridHeight * gridCellWidth, gridWidth, gridHeight);
    game.addObject(grid);
    game.tick();
};
