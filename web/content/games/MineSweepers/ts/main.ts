import { Canvas } from "../../../lib/display/Canvas.js";
import { Game } from "../../../lib/games/Game.js";
import { Board } from "./Board.js";

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new Game(canvas);

  game.addWorld("main", new Board(canvas, 25, 25));

  game.start();
};
