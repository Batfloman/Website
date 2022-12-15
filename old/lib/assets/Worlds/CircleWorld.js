"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleWorld = void 0;
const Util_1 = require("../../util/Util");
const Vector2_1 = require("../../util/Vector2");
const World_1 = require("./World");
class CircleWorld extends World_1.World {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    isInsideWorld(point) {
        return Util_1.Util.distance(new Vector2_1.Vector2(), point) < this.radius;
    }
    render(renderer) {
        renderer.renderCircle(new Vector2_1.Vector2(), this.radius);
    }
}
exports.CircleWorld = CircleWorld;
