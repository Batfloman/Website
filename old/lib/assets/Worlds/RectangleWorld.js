"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectangleWorld = void 0;
const Vector2_js_1 = require("../../util/Vector2.js");
const World_js_1 = require("./World.js");
class RectangleWorld extends World_js_1.World {
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
        renderer.renderRectangle(new Vector2_js_1.Vector2(), this.width, this.height);
    }
}
exports.RectangleWorld = RectangleWorld;
