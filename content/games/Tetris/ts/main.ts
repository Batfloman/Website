import {Canvas} from "../../../lib/display/Canvas.js";
import { Util } from "../../../lib/util/Util.js";
import { Vector2 } from "../../../lib/util/Vector2.js";
import { Block } from "./assets/Block.js";
import { Shape } from "./assets/Shape.js";
import {TetrisGame} from "./assets/TetrisGame.js";
import { TetrisGrid } from "./assets/TetrisGrid.js";

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new TetrisGame(canvas);

  // const block = new Block(game.getWorld("main") as TetrisGrid, new Vector2(0, 0));
  // game.addObject(block);

  

  game.start();
};
