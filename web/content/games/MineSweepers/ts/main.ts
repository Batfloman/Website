import Canvas from "../../../lib/display/Canvas.js";
import Game from "../../../lib/games/Game.js";

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new Game(canvas);

  game.tick();
}