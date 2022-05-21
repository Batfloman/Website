import { WorldObject } from "./WorldObject.js";
export class GridCell extends WorldObject {
    testMoveInGrid(x, y) {
        const rightX = x >= 0 && x < this.grid.xSize;
        const rightY = y >= 0 && y < this.grid.ySize;
        return rightX && rightY;
    }
    moveInGrid(x, y) {
        this.gridPos.x += x;
        this.gridPos.y += y;
    }
    setGrid(grid) {
        this.grid = grid;
    }
    setGridPos(x, y) {
        this.gridPos.x = x;
        this.gridPos.y = y;
    }
}
