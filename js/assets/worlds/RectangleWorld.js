import { Vector2 } from "../../util/Vector2.js";
import { World } from "./World.js";
export class RectangleWorld extends World {
    width;
    height;
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    isInsideWorld(point) {
        const rightX = point.x > -this.width / 2 && point.x < this.width / 2;
        const rightY = point.y > -this.height / 2 && point.y < this.height / 2;
        return rightX && rightY;
    }
    render(renderer) {
        renderer.renderRectangle(new Vector2(), this.width, this.height);
    }
}
