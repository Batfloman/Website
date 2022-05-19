import { WorldObject } from "../../../lib/assets/WorldObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import Rectangel from "../../../lib/physic/boundingBox/Rectangel.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Board from "./Board.js";

export default class Cell extends WorldObject<Rectangel> {
  board: Board;

  constructor(board: Board) {
    const pos = board.pos;
    const hitBox = new Rectangel(
      board.hitBox.width / board.grid.getSizeX(),
      board.hitBox.height / board.grid.getSizeY()
    )
    const boardOrientation = board.orientation;

    super(pos, hitBox, boardOrientation);

    this.board = board;
  }

  update2(dt: number): void {}
  render(renderer: Renderer): void {
    console.log("render");
    renderer.renderRectangle(this.pos, this.hitBox.width, this.hitBox.height);
  }
}