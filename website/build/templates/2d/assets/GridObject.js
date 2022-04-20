import Rectangle from "../boundingBox/Rectangle.js";
import WorldObject from "./WorldObject2.js";
export default class GridObject extends WorldObject {
    constructor(center, width, height, xCells, yCells) {
        super(center, new Rectangle(width, height));
        if (!yCells)
            yCells = xCells;
        this.grid = new Array();
        for (let y = 0; y < yCells; y++) {
            let yRow = new Array();
            for (let x = 0; x < xCells; x++) {
                yRow.push("[]");
            }
            this.grid.push(yRow);
        }
    }
    get(x, y) {
        return this.grid[y][x];
    }
}
