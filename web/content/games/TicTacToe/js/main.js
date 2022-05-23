import Canvas from "../../../lib/display/Canvas.js";
import TicTacToeGame from "./assets/TicTacToeGame.js";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new TicTacToeGame(canvas);
    game.setCamaraScaleLock(false);
    game.setCamaraMovementLock(false);
    game.randomPlayerTurn();
    game.tick();
};
