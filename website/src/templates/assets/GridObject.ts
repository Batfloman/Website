import Rectangle from "../physic/2d/boundingBox/Rectangle.js";
import Vector2 from "../util/Vector2.js";
import WorldObject from "./WorldObject.js";

export default class GridObject extends WorldObject {
  grid: Array<Array<string>>;

  constructor(center: Vector2, width: number, height: number, xCells: number, yCells?: number) {
    super(center, new Rectangle(width, height));

    if(!yCells) yCells = xCells;

    this.grid = new Array();

    for(let y = 0; y < yCells; y++) {
      let yRow = new Array();
      for(let x = 0; x < xCells; x++) {
        yRow.push("[]");
      }
      this.grid.push(yRow);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    
  }

  get(x: number, y: number) {
    return this.grid[y][x];
  }
}