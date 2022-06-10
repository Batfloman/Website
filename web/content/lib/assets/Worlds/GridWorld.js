import { Matrix2 } from "../../util/Matrix2.js";
import { Vector2 } from "../../util/Vector2.js";
import { GridCell } from "../objects/GridCell.js";
import { RectangleWorld } from "./RectangleWorld.js";
export class GridWorld extends RectangleWorld {
    constructor(width, height, xSize, ySize) {
        super(width, height);
        this.grid = new Matrix2(xSize, ySize);
        this.xSize = xSize;
        this.ySize = ySize;
        this.cellWidth = width / xSize;
        this.cellHeight = height / ySize;
    }
    render(renderer) {
        renderer.renderGrid(new Vector2(), this.xSize, this.ySize, this.cellWidth, this.cellHeight);
    }
    addCell(cell) {
        this.addObject(cell);
        cell.setGrid(this);
    }
    putObjectsInCunks() {
        super.putObjectsInCunks();
        this.putObjectsInGrid();
    }
    putObjectsInGrid() {
        const gridObjects = this.findObjects(GridCell);
    }
}
