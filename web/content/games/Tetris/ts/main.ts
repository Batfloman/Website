import Canvas from "../../../lib/display/Canvas.js";
import Vector2 from "../../../lib/util/Vector2.js";
import TetrisGame from "./assets/TetrisGame.js";

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new TetrisGame(canvas);

  game.setCamaraMovementLock(false);
  game.setCamaraScaleLock(false);

  game.start();
};
