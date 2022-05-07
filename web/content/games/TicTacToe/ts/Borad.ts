import Canvas from "../../../lib/display/Canvas.js";
import { Game } from "../../../lib/games/Game.js";
import Polygon2 from "../../../lib/physic/boundingBox/Polygon2.js";
import Matrix2 from "../../../lib/util/Matrix2.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Rectangle from "../../../lib/physic/boundingBox/Rectangel.js";
import Renderer from "../../../lib/display/Renderer.js";
import { Color } from "../../../lib/util/Color.js";
import WorldObject from "../../../lib/assets/WorldObject.js";

export default class Board extends WorldObject {
  grid: Matrix2<string>;

  constructor(pos: Vector2, xSize: number, ySize: number) {
    super(pos, new Polygon2([]));

    this.grid = new Matrix2(xSize, ySize);
    this.zIndex = -1;
  }

  init(game: Game, canvas: Canvas): void {
    super.init(game, canvas);

    this.hitBox = new Rectangle(this.canvas.width / 2, this.canvas.height / 2);
  }

  update(dt: number): void {}
  render(renderer: Renderer): void {
    renderer.setLineWidth(this.canvas.width / this.grid.getSizeX() / 50);
    renderer.setStrokeColor(Color.get("black"));
    renderer.setFillColor(Color.none);
    renderer.renderGrid(
      this.pos,
      this.grid.getSizeX(),
      this.grid.getSizeY(),
      this.canvas.width / this.grid.getSizeX(),
      this.canvas.height / this.grid.getSizeY()
    );
  }
}
