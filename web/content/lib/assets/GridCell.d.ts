import Rectangle from "../physic/boundingBox/Rectangle";
import { GridObject } from "./GridObject";
import { WorldObject } from "./WorldObject";
export declare abstract class GridCell extends WorldObject<Rectangle> {
    grid: GridObject<GridCell>;
    setGrid(grid: GridObject<GridCell>): void;
}
