import Rectangle from "../../physic/boundingBox/Rectangle.js";
import Matrix2 from "../../util/Matrix2.js";
import { WorldObject } from "./WorldObject.js";
export class GridObject extends WorldObject {
    constructor(pos, width, height, xSize, ySize) {
        super(pos, new Rectangle(width, height));
        this.grid = new Matrix2(xSize, ySize);
        this.xSize = xSize;
        this.ySize = ySize;
        this.xCellSize = width / xSize;
        this.yCellSize = height / ySize;
    }
    update2(dt) {
        if (!this.grid)
            return;
        const sizeX = this.grid.getSizeX();
        const sizeY = this.grid.getSizeY();
        const w = this.hitBox.width;
        const h = this.hitBox.height;
        for (let y = 0; y < this.grid.getSizeY(); y++) {
            for (let x = 0; x < this.grid.getSizeX(); x++) {
                const cell = this.grid.get(x, y);
                if (cell instanceof WorldObject) {
                    cell.pos.x = this.pos.x - w / 2 + (w / sizeX) * x + w / (2 * sizeX);
                    cell.pos.y = this.pos.y - h / 2 + (h / sizeY) * y + h / (2 * sizeY);
                    console.log(cell.pos);
                }
                this.updateCell(x, y, dt);
            }
        }
    }
    render(renderer) {
        if (!this.grid)
            return;
        for (let y = 0; y < this.grid.getSizeY(); y++) {
            for (let x = 0; x < this.grid.getSizeX(); x++) {
                this.renderCell(x, y, renderer);
            }
        }
    }
    add(cell) {
        this.cells.push(cell);
        cell.setGrid(this);
    }
}
