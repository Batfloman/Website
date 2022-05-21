import Rectangle from "../../physic/boundingBox/Rectangle.js";
import Vector2 from "../../util/Vector2.js";
import { GridObject } from "./GridObject.js";
import { WorldObject } from "./WorldObject.js";
export declare abstract class GridCell extends WorldObject<Rectangle> {
    grid: GridObject<GridCell>;
    gridPos: Vector2;
    testMoveInGrid(x: number, y: number): boolean;
    moveInGrid(x: number, y: number): void;
    setGrid(grid: GridObject<GridCell>): void;
    setGridPos(x: number, y: number): void;
}
