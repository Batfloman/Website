import { Renderer } from "../../display/Renderer.js";
import { Matrix2 } from "../../util/Matrix2.js";
import { GridCell } from "../objects/GridCell";
import { RectangleWorld } from "./RectangleWorld.js";
export declare class GridWorld extends RectangleWorld {
    grid: Matrix2<Array<GridCell>>;
    xSize: number;
    ySize: number;
    cellWidth: number;
    cellHeight: number;
    constructor(width: number, height: number, xSize: number, ySize: number);
    addCell(cell: GridCell): void;
    render(renderer: Renderer): void;
}
