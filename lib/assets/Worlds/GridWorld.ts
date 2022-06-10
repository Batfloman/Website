import { Renderer } from "../../display/Renderer.js";
import { Matrix2 } from "../../util/Matrix2.js";
import { Vector2 } from "../../util/Vector2.js";
import { GridCell } from "../objects/GridCell.js";
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

  render(renderer: Renderer): void {
    renderer.renderGrid(new Vector2(), this.xSize, this.ySize, this.cellWidth, this.cellHeight);
  }

  addCell(cell: GridCell) {
    this.addObject(cell);

    cell.setGrid(this);
  }

  // override
  putObjectsInCunks(): void {
    super.putObjectsInCunks();

    this.putObjectsInGrid();
  }

  putObjectsInGrid() {
    const gridObjects: GridCell[] = this.findObjects<GridCell>(GridCell);

    // console.log(gridObjects);
  }
}
