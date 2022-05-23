import Renderer from "../../display/Renderer.js";
import Matrix2 from "../../util/Matrix2.js";
import Vector2 from "../../util/Vector2.js";
import { GridCell } from "../Objects/GridCell";
import RectangleWorld from "./RectangleWorld.js";

export default class GridWorld extends RectangleWorld {
  grid: Matrix2<Array<GridCell>>
  
  xSize: number;
  ySize: number;

  xCellSize: number;
  yCellSize: number;
  
  constructor(width: number, height: number, xSize: number, ySize: number) {
    super(width, height);

    this.grid = new Matrix2(xSize, ySize);
    this.xSize = xSize;
    this.ySize = ySize;
    this.xCellSize = width / xSize;
    this.yCellSize = height / ySize;
  }

  addCell(cell: GridCell) {
    this.addObject(cell);

    cell.setGrid(this);
  }

  render(renderer: Renderer): void {
    renderer.renderGrid(new Vector2(), this.xSize, this.ySize, this.xCellSize, this.yCellSize);
  }
}