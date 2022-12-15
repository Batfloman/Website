"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon2 = void 0;
const Util_js_1 = require("../../util/Util.js");
const Vector2_js_1 = require("../../util/Vector2.js");
const Polygon2Helper_js_1 = require("../algorithms/Polygon2Helper.js");
const HitBox_js_1 = require("./HitBox.js");
class Polygon2 extends HitBox_js_1.HitBox {
    constructor(model) {
        super();
        // points relative to a (0|0) center with 0° rotation
        this.model = new Array();
        this.model = model;
        this.farthestDistance = Util_js_1.Util.farthestPoint(new Vector2_js_1.Vector2(), this.model).getMagnitude();
        this.isConvex = Polygon2Helper_js_1.Polygon2Helper.testConvex(this);
    }
    /**
     * offsets all Points to match the "real" center
     */
    centerModel() {
        const realCenter = this.findCenter();
        this.model.forEach((point) => {
            point.x -= Util_js_1.Util.math.round(realCenter.x, 2);
            point.y -= Util_js_1.Util.math.round(realCenter.y, 2);
        });
        this.farthestDistance = Util_js_1.Util.farthestPoint(new Vector2_js_1.Vector2(), this.model).getMagnitude();
    }
    findCenter() {
        let center = new Vector2_js_1.Vector2();
        for (let point of this.model) {
            center = center.add(point);
        }
        return center.scale(1 / this.model.length);
    }
    // ==========================================================================================
    // from Super classes
    translatePoints(pos, orientation) {
        return Polygon2Helper_js_1.Polygon2Helper.translatePoints(this.model, pos, orientation);
    }
    scale(scalar) {
        this.model.forEach((point) => {
            point = point.scale(scalar);
        });
    }
}
exports.Polygon2 = Polygon2;
