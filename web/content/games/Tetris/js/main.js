import { Canvas } from "../../../lib/display/Canvas.js";
import { TetrisGame } from "./assets/TetrisGame.js";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new TetrisGame(canvas);
    game.start();
};
