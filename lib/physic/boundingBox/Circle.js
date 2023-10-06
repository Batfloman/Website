"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const Util_js_1 = require("../../util/Util.js");
const HitBox_js_1 = require("./HitBox.js");
class Circle extends HitBox_js_1.HitBox {
    constructor(radius = 0) {
        super();
        this.radius = radius;
        this.isConvex = true;
        this.farthestDistance = radius;
    }
    // ==========================================================================================
    // from Super classes
    translatePoints(pos, orientation) {
        return [
            Util_js_1.Util.moveDirection(pos, orientation, this.radius),
            Util_js_1.Util.moveDirection(pos, 360 - orientation, this.radius),
        ];
    }
    scale(scalar) {
        this.radius *= scalar;
    }
}
exports.Circle = Circle;
