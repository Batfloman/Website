import { TurnBasedPlayer } from "../../../lib/assets/players/TurnBasedPlayer.js";
import { Canvas } from "../../../lib/display/Canvas.js";
import { TurnBasedGame as Game } from "../../../lib/games/TurnBasedGame.js";
import { GridWorld } from "../../../lib/assets/worlds/GridWorld.js";

const htmlCanvas = document.querySelector("#game-board");

window.onload = () => {
  if (!(htmlCanvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas not found!");
    return;
  }

  const whitePlayer = new TurnBasedPlayer();
  const blackPlayer = new TurnBasedPlayer();

  const canvas = new Canvas(htmlCanvas);
  const game = new Game(canvas, [whitePlayer, blackPlayer]);

  const world = new GridWorld(canvas.width, canvas.height, 8, 8);
  console.log(world);
  game.setWorld("main", world);

  game.setCamaraScaleLock(true);
  game.setCamaraMovementLock(true);
};
