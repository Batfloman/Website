import { Matrix2 } from "../../util/Matrix2.js";
import { Vector2 } from "../../util/Vector2.js";
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
    addCell(cell) {
        this.addObject(cell);
        cell.setGrid(this);
    }
    render(renderer) {
        renderer.renderGrid(new Vector2(), this.xSize, this.ySize, this.cellWidth, this.cellHeight);
    }
}
