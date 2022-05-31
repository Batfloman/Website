import { Rectangle } from "../../physic/boundingBox/Rectangle.js";
import { Vector2 } from "../../util/Vector2.js";
import { GridWorld } from "../worlds/GridWorld.js";
import { WorldObject } from "./WorldObject.js";
export declare abstract class GridCell extends WorldObject<Rectangle> {
    grid: GridWorld;
    gridPos: Vector2;
    testMoveInGrid(x: number, y: number): boolean;
    moveInGrid(x: number, y: number): void;
    setGrid(grid: GridWorld): void;
    setGridPos(x: number, y: number): void;
}
