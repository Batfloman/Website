import { Renderer } from "../../display/Renderer.js";
import { Matrix2 } from "../../util/Matrix2.js";
import { Vector2 } from "../../util/Vector2.js";
import { GridCell } from "../objects/GridCell";
import { RectangleWorld } from "./RectangleWorld.js";

export class GridWorld extends RectangleWorld {
  grid: Matrix2<Array<GridCell>>;

  xSize: number;
  ySize: number;

  cellWidth: number;
  cellHeight: number;

  constructor(width: number, height: number, xSize: number, ySize: number) {
    super(width, height);

    this.grid = new Matrix2(xSize, ySize);
    this.xSize = xSize;
    this.ySize = ySize;
    this.cellWidth = width / xSize;
    this.cellHeight = height / ySize;
  }

  addCell(cell: GridCell) {
    this.addObject(cell);

    cell.setGrid(this);
  }

  render(renderer: Renderer): void {
    renderer.renderGrid(new Vector2(), this.xSize, this.ySize, this.cellWidth, this.cellHeight);
  }
}
