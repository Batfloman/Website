import { Vector2 } from "../../util/Vector2.js";
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
    getWorldPos() {
        const topLeft = new Vector2(this.grid.pos.x - this.grid.width / 2, this.grid.pos.x + this.grid.height / 2);
        const posRelativeTopLeft = new Vector2(this.gridPos.x * this.grid.xCellSize - this.grid.xCellSize / 2, this.gridPos.y * this.grid.yCellSize - this.grid.yCellSize / 2);
        return posRelativeTopLeft.add(topLeft);
    }
}
