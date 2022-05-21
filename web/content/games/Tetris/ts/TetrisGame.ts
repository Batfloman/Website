import { Game } from "../../../lib/games/Game.js";
import Shape from "./Shape.js";

export default class TetrisGame extends Game {
  currentShape!: Shape;
}
