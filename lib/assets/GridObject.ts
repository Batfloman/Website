import Renderer from "../display/Renderer.js";
import Rectangle from "../boundingBox/Rectangle.js";
import Matrix2 from "../util/Matrix2.js";
import Vector2 from "../util/Vector2.js";
import { GridCell } from "./GridCell.js";
import { WorldObject } from "./WorldObject.js";

export abstract class GridObject<Type extends GridCell> extends WorldObject<Rectangle> {
  grid!: Matrix2<Type>;
  cells!: GridCell[];

  xSize: number;
  ySize: number;

  xCellSize: number;
  yCellSize: number;

  constructor(pos: Vector2, width: number, height: number, xSize: number, ySize: number) {
    super(pos, new Rectangle(width, height));

    this.grid = new Matrix2(xSize, ySize);

    this.xSize = xSize;
    this.ySize = ySize;

    this.xCellSize = width / xSize;
    this.yCellSize = height / ySize;
  }

  // ==========================================================================================
  // update + render  

  update2(dt: number): void {
    if (!this.grid) return;

    const sizeX = this.grid.getSizeX();
    const sizeY = this.grid.getSizeY();
    const w = this.hitBox.width;
    const h = this.hitBox.height;

    for (let y = 0; y < this.grid.getSizeY(); y++) {
      for (let x = 0; x < this.grid.getSizeX(); x++) {
        const cell: Type | string = this.grid.get(x, y);
        if (cell instanceof WorldObject) {
          cell.pos.x = this.pos.x - w / 2 + (w / sizeX) * x + w / (2 * sizeX);
          cell.pos.y = this.pos.y - h / 2 + (h / sizeY) * y + h / (2 * sizeY);
          console.log(cell.pos);
        }

        this.updateCell(x, y, dt);
      }
    }
  }

  render(renderer: Renderer): void {
    if (!this.grid) return;

    for (let y = 0; y < this.grid.getSizeY(); y++) {
      for (let x = 0; x < this.grid.getSizeX(); x++) {
        this.renderCell(x, y, renderer);
      }
    }
  }

  // ==========================================================================================
  // unique methods

  abstract renderCell(x: number, y: number, renderer: Renderer): void;
  abstract updateCell(x: number, y: number, dt: number): void;

  add(cell: Type) {
    this.cells.push(cell);
    cell.setGrid(this);
  }
  
}
