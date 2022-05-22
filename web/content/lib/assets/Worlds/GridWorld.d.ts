import Matrix2 from "../../util/Matrix2.js";
import { GridCell } from "../Objects/GridCell";
import RechtangleWorld from "./RectangleWorld.js";
export default class GridWorld extends RechtangleWorld {
    grid: Matrix2<Array<GridCell>>;
    xSize: number;
    ySize: number;
    xCellSize: number;
    yCellSize: number;
    constructor(width: number, height: number, xSize: number, ySize: number);
    addCell(cell: GridCell): void;
}
