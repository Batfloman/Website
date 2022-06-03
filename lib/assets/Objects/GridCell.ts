import { Rectangle } from "../../physic/boundingBox/Rectangle.js";
import { Vector2 } from "../../util/Vector2.js";
import { GridWorld } from "../worlds/GridWorld.js";
import { WorldObject } from "./WorldObject.js";

export abstract class GridCell extends WorldObject<Rectangle> {
  grid!: GridWorld;

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

  setGrid(grid: GridWorld) {
    this.grid = grid;
  }

  setGridPos(x: number, y: number) {
    this.gridPos.x = x;
    this.gridPos.y = y;
  }

  getWorldPos(): Vector2 {
    const topLeft = new Vector2(
      this.grid.pos.x - this.grid.width / 2,
      this.grid.pos.x + this.grid.height / 2
    );

    const posRelativeTopLeft = new Vector2(
      this.gridPos.x * this.grid.xCellSize - this.grid.xCellSize / 2,
      this.gridPos.y * this.grid.yCellSize - this.grid.yCellSize / 2
    );

    return posRelativeTopLeft.add(topLeft);
  }
}
