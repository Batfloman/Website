import Rectangle from "../../physic/boundingBox/Rectangle.js";
import Vector2 from "../../util/Vector2.js";
import { GridObject } from "./GridObject.js";
import { WorldObject } from "./WorldObject.js";

export abstract class GridCell extends WorldObject<Rectangle> {
  grid!: GridObject<GridCell>;

  gridPos!: Vector2;
  
  testMoveInGrid(x: number, y: number): boolean {
    const rightX = x >= 0 && x < this.grid.xSize;
    const rightY = y >= 0 && y < this.grid.ySize;
    return rightX && rightY;
  }

  moveInGrid(x: number, y: number): void {
    this.gridPos.x += x;
    this.gridPos.y += y;
  }

  setGrid(grid: GridObject<GridCell>) {
    this.grid = grid;
  }

  setGridPos(x: number, y: number) {
    this.gridPos.x = x;
    this.gridPos.y = y;
  }
}