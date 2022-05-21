import Renderer from "../display/Renderer.js";
import Rectangle from "../physic/boundingBox/Rectangle.js";
import Matrix2 from "../util/Matrix2.js";
import Vector2 from "../util/Vector2.js";
import { GridCell } from "./GridCell.js";
import { WorldObject } from "./WorldObject.js";
export declare abstract class GridObject<Type extends GridCell> extends WorldObject<Rectangle> {
    grid: Matrix2<Type>;
    cells: GridCell[];
    xSize: number;
    ySize: number;
    xCellSize: number;
    yCellSize: number;
    constructor(pos: Vector2, width: number, height: number, xSize: number, ySize: number);
    update2(dt: number): void;
    render(renderer: Renderer): void;
    abstract renderCell(x: number, y: number, renderer: Renderer): void;
    abstract updateCell(x: number, y: number, dt: number): void;
    add(cell: Type): void;
}
