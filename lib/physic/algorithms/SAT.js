"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAT = void 0;
const Circle_js_1 = require("../boundingBox/Circle.js");
// Separating Axis Theorem
class SAT {
    static testCollision(obj1, obj2) {
        if (obj1.hitBox instanceof Circle_js_1.Circle || obj2.hitBox instanceof Circle_js_1.Circle)
            return true;
        return this.areColliding(obj1, obj2) && this.areColliding(obj2, obj1);
    }
    /**
     * Tests all Sides of polygon 1 with SAT agaings polygon 2
     * Returns false if a gap is found - else true
     */
    static areColliding(polygon1, polygon2) {
        const points1 = polygon1.translatePoints();
        const points2 = polygon2.translatePoints();
        let lastPoint = points1[points1.length - 1];
        for (let i = 0; i < points1.length; i++) {
            const point = points1[i];
            const normal = lastPoint.vectorTo(point).getNormal();
            // projection shape 1
            let min1 = Infinity;
            let max1 = -Infinity;
            points1.forEach((point) => {
                const dot = point.dotProduct(normal) / normal.getMagnitude();
                min1 = Math.min(min1, dot);
                max1 = Math.max(max1, dot);
            });
            // projection shape 2
            let min2 = Infinity;
            let max2 = -Infinity;
            points2.forEach((point) => {
                const dot = point.dotProduct(normal) / normal.getMagnitude();
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
exports.SAT = SAT;
