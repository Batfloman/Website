import Renderer from "../display/Renderer.js";
import Rectangle from "../physic/boundingBox/Rectangle.js";
import Matrix2 from "../util/Matrix2.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";

export abstract class GridObject<Type> extends WorldObject<Rectangle> {
  grid!: Matrix2<Type>;
  
  constructor(pos: Vector2, width: number, height: number) {
    const hitBox = new Rectangle(width, height);

    super(pos, hitBox);
  }

  render(renderer: Renderer): void {
    for(let y = 0; y < this.grid.getSizeY(); y++) {
      for(let x = 0; x < this.grid.getSizeX(); x++) {
        this.renderCell(x, y, renderer);
      }
    }
  }

  abstract renderCell(x: number, y: number, renderer: Renderer): void;
}