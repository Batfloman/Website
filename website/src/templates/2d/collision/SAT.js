"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WorldObject2_js_1 = __importDefault(require("../assets/WorldObject2.js"));
// Separating Axis Theorem
class SAT {
    static testCollision(obj1, obj2) {
        if (obj1.hitBox.isConvex && obj2.hitBox.isConvex)
            return this.areColliding(obj1, obj2) && this.areColliding(obj2, obj1);
        else if (!obj1.hitBox.isConvex && obj2.hitBox.isConvex) {
            let overlap = false;
            let parts = obj1.hitBox.convexParts;
            if (!!parts) {
                for (let i = 0; i < parts.length; i++) {
                    let convexObj = new WorldObject2_js_1.default(obj1.pos, parts[i], obj1.angle);
                    overlap = SAT.areColliding(convexObj, obj2) && SAT.areColliding(obj2, convexObj);
                    if (overlap)
                        return true;
                }
            }
        }
        else if (obj1.hitBox.isConvex && !obj2.hitBox.isConvex) {
            let overlap = false;
            let parts = obj2.hitBox.convexParts;
            if (!!parts) {
                for (let i = 0; i < parts.length; i++) {
                    let convexObj = new WorldObject2_js_1.default(obj2.pos, parts[i], obj2.angle);
                    overlap = SAT.areColliding(convexObj, obj1) && SAT.areColliding(obj1, convexObj);
                    if (overlap)
                        return true;
                }
            }
        }
        else {
            let overlap = false;
            let parts1 = obj1.hitBox.convexParts;
            if (!!parts1) {
                for (let i = 0; i < parts1.length; i++) {
                    let convexObj1 = new WorldObject2_js_1.default(obj1.pos, parts1[i], obj1.angle);
                    let parts2 = obj2.hitBox.convexParts;
                    if (!!parts2) {
                        for (let j = 0; j < parts2.length; j++) {
                            let convexObj2 = new WorldObject2_js_1.default(obj2.pos, parts2[j], obj2.angle);
                            overlap = SAT.areColliding(convexObj1, convexObj2) && SAT.areColliding(convexObj2, convexObj1);
                            if (overlap)
                                return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    /**
     * Tests all Sides of polygon 1 with SAT agaings polygon 2
     * Returns false if a gap is found - else true
     */
    static areColliding(polygon1, polygon2) {
        let points1 = polygon1.translatePoints();
        let points2 = polygon2.translatePoints();
        let lastPoint = points1[points1.length - 1];
        for (let i = 0; i < points1.length; i++) {
            let point = points1[i];
            let normal = lastPoint.vectorTo(point).getNormal();
            // projection shape 1 
            let min1 = Infinity;
            let max1 = -Infinity;
            points1.forEach(point => {
                let dot = point.dotProduct(normal) / normal.getMagnitude();
                min1 = Math.min(min1, dot);
                max1 = Math.max(max1, dot);
            });
            // projection shape 2 
            let min2 = Infinity;
            let max2 = -Infinity;
            points2.forEach(point => {
                let dot = point.dotProduct(normal) / normal.getMagnitude();
                min2 = Math.min(min2, dot);
                max2 = Math.max(max2, dot);
            });
            if (!(max2 >= min1 && max1 >= min2))
                return false;
            lastPoint = point;
        }
        return true;
    }
}
exports.default = SAT;
