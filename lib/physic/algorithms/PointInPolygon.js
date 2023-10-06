"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointInPolygon = void 0;
const Util_js_1 = require("../../util/Util.js");
const Polygon2_js_1 = require("../boundingBox/Polygon2.js");
const Polygon2Helper_js_1 = require("./Polygon2Helper.js");
class PointInPolygon {
    static isPointInsidePolygon(point, polygon) {
        const vertices = polygon instanceof Array ? polygon : polygon.translatePoints();
        const winding = Polygon2Helper_js_1.Polygon2Helper.findWinding(new Polygon2_js_1.Polygon2(vertices));
        for (let i in vertices) {
            let index = Number.parseInt(i);
            const a = Util_js_1.Util.array.getItem(vertices, index);
            const b = Util_js_1.Util.array.getItem(vertices, index - 1);
            const a_to_b = b.subtract(a);
            const a_to_p = point.subtract(a);
            const cross = a_to_b.crossProduct(a_to_p);
            if (!Polygon2Helper_js_1.Polygon2Helper.isConvex(winding, cross))
                return false;
        }
        return true;
    }
}
exports.PointInPolygon = PointInPolygon;
