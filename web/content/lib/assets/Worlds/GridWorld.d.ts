import { Renderer } from "../../display/Renderer.js";
import { Matrix2 } from "../../util/Matrix2.js";
import { Vector2 } from "../../util/Vector2.js";
import { GridCell } from "../objects/GridCell.js";
import { RectangleWorld } from "./RectangleWorld.js";
export declare class GridWorld extends RectangleWorld {
    grid: Matrix2<Array<GridCell>>;
    xSize: number;
    ySize: number;
    cellWidth: number;
    cellHeight: number;
    constructor(width: number, height: number, xSize: number, ySize: number);
    private resize;
    clicked(worldPos: Vector2): void;
    findGridPosition(worldPos: Vector2): Vector2;
    render(renderer: Renderer): void;
    putObjectsInCunks(): void;
    putObjectsInGrid(): void;
    addCell(cell: GridCell): void;
    private removeFromGrid;
    private addToGrid;
}
