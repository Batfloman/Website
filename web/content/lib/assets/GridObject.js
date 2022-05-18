import Rectangle from "../physic/boundingBox/Rectangle.js";
import { WorldObject } from "./WorldObject.js";
export class GridObject extends WorldObject {
    constructor(pos, width, height) {
        const hitBox = new Rectangle(width, height);
        super(pos, hitBox);
    }
    render(renderer) {
        for (let y = 0; y < this.grid.getSizeY(); y++) {
            for (let x = 0; x < this.grid.getSizeX(); x++) {
                this.renderCell(x, y, renderer);
            }
        }
    }
}
