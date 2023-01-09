import { Canvas } from "../../../lib/display/Canvas.js";
import { TetrisGame } from "./assets/TetrisGame.js";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new TetrisGame(canvas);
    // const block = new Block(game.getWorld("main") as TetrisGrid, new Vector2(0, 0));
    // game.addObject(block);
    game.start();
};
