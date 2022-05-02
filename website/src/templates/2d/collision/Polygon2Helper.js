"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_js_1 = __importDefault(require("../../util/Util.js"));
const Formeln2_js_1 = __importDefault(require("../Formeln2.js"));
class Polygon2Helper {
    static isConvex(polygon) {
        let windung = "right";
        let a = Util_js_1.default.getItem(polygon.model, -1);
        let b = Util_js_1.default.getItem(polygon.model, 0);
        let c = Util_js_1.default.getItem(polygon.model, 1);
        let ab = b.subtract(a);
        let bc = c.subtract(b);
        if (ab.crossProduct(bc) < 0) {
            windung = "left";
        }
        for (let i = 0; i < polygon.model.length; i++) {
            let a = Util_js_1.default.getItem(polygon.model, i - 1);
            let b = Util_js_1.default.getItem(polygon.model, i);
            let c = Util_js_1.default.getItem(polygon.model, i + 1);
            let ab = b.subtract(a);
            let bc = c.subtract(b);
            if (windung == "right" && ab.crossProduct(bc) < 0)
                return false;
            else if (windung == "left" && ab.crossProduct(bc) > 0)
                return false;
        }
        return true;
    }
    static translatePoint(point, center, angle) {
        return Formeln2_js_1.default.rotateAroundCenter(center, point.add(center), angle);
    }
    static translatePoints(points, center, angle) {
        let p = new Array();
        points.forEach(point => {
            p.push(Formeln2_js_1.default.rotateAroundCenter(center, point.add(center), !angle ? 0 : angle));
        });
        return p;
    }
}
exports.default = Polygon2Helper;
