"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon2Helper = void 0;
const Util_js_1 = require("../../util/Util.js");
class Polygon2Helper {
    /**
     * Test a polygon for convexity
     */
    static testConvex(polygon) {
        if (polygon.model.length <= 3)
            return true;
        const winding = Polygon2Helper.findWinding(polygon);
        for (let i = 0; i < polygon.model.length; i++) {
            const a = Util_js_1.Util.array.getItem(polygon.model, i - 1);
            const b = Util_js_1.Util.array.getItem(polygon.model, i);
            const c = Util_js_1.Util.array.getItem(polygon.model, i + 1);
            const ba = a.subtract(b);
            const bc = c.subtract(b);
            if (!Polygon2Helper.isConvex(winding, ba.crossProduct(bc)))
                return false;
        }
        return true;
    }
    /**
     * test a vertex for Convexity
     */
    static isConvex(windung, crossProduct) {
        if (windung == "clockwise" && crossProduct >= 0)
            return true;
        if (windung == "counterclockwise" && crossProduct <= 0)
            return true;
        return false;
    }
    /**
     * Returns the winding of an Polygon
     */
    static findWinding(polygon) {
        return this.findArea(polygon) < 0 ? "clockwise" : "counterclockwise";
    }
    static findArea(polygon) {
        let area = 0;
        for (let i = 0; i < polygon.model.length; i++) {
            const a = Util_js_1.Util.array.getItem(polygon.model, i);
            const b = Util_js_1.Util.array.getItem(polygon.model, i + 1);
            area += a.x * b.y;
            area -= a.y * b.x;
        }
        return area / 2;
    }
    /**
     * Translates a point and returns the new Position
     */
    static translatePoint(point, center, angle = 0) {
        return Util_js_1.Util.rotateAroundCenter(center, point.add(center), angle);
    }
    static translatePoints(points, center, angle = 0) {
        const translated = [];
        points.forEach((point) => {
            translated.push(Util_js_1.Util.rotateAroundCenter(center, point.add(center), angle));
        });
        return translated;
    }
}
exports.Polygon2Helper = Polygon2Helper;
