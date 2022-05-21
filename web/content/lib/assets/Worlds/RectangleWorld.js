import World from "./World";
export default class RechtangleWorld extends World {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    isInsideWorld(point) {
        const rightX = point.x > -this.width / 2 && point.x < this.width / 2;
        const rightY = point.y > -this.height / 2 && point.y < this.width / 2;
        return rightX && rightY;
    }
}
