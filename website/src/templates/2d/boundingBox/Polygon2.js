"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_js_1 = __importDefault(require("../../util/Vector2.js"));
const Polygon2Helper_js_1 = __importDefault(require("../collision/Polygon2Helper.js"));
const Triangulation_js_1 = __importDefault(require("../collision/Triangulation.js"));
class Polygon2 {
    constructor(model, startAngle) {
        // points relative to a 0, 0 center with 0° rotation
        this.model = new Array();
        // angle in degree
        this.angle = 0;
        this.model = model;
        this.isConvex = Polygon2Helper_js_1.default.isConvex(this);
        this.convexParts = this.isConvex ? null : Triangulation_js_1.default.triangulate(this.model);
        this.angle = !startAngle ? 0 : startAngle;
    }
    /**
     * offsets all Points to match the "real" center
     */
    centerModel() {
        let realCenter = this.findCenter();
        this.model.forEach(point => {
            point.x -= Math.round(realCenter.x * 100) / 100;
            point.y -= Math.round(realCenter.y * 100) / 100;
        });
    }
    findCenter() {
        let center = new Vector2_js_1.default(0, 0);
        this.model.forEach(point => {
            center = center.add(point);
        });
        let realCenter = center.scale(1 / this.model.length);
        return realCenter;
    }
}
exports.default = Polygon2;
