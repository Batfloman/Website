import Matrix2 from "../../util/Matrix2.js";
import Vector2 from "../../util/Vector2.js";
import RechtangleWorld from "./RectangleWorld.js";
export default class GridWorld extends RechtangleWorld {
    constructor(width, height, xSize, ySize) {
        super(width, height);
        this.grid = new Matrix2(xSize, ySize);
        this.xSize = xSize;
        this.ySize = ySize;
        this.xCellSize = width / xSize;
        this.yCellSize = height / ySize;
    }
    addCell(cell) {
        this.addObject(cell);
        cell.setGrid(this);
    }
    render(renderer) {
        console.log("WArum du nicht rendern!");
        renderer.renderGrid(new Vector2(), this.xSize, this.ySize, this.xCellSize, this.yCellSize);
    }
}
