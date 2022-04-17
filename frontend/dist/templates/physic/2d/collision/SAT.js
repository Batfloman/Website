"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Formeln_1 = __importDefault(require("../../../Formeln"));
// Separating Axis Theorem
class SAT {
    static testCollision(obj1, obj2) {
        [obj1, obj2].forEach(obj => obj.translatePoints());
        let polygon1 = obj1.hitBox;
        let polygon2 = obj2.hitBox;
        return this.areColliding(polygon1, polygon2) && this.areColliding(polygon2, polygon1);
    }
    /**
     * Tests all Sides of polygon 1 with SAT agaings polygon 2
     * Returns false if a gap is found - else true
     */
    static areColliding(polygon1, polygon2) {
        let lastPoint = polygon1.points[polygon1.points.length - 1];
        for (let i = 0; i < polygon1.points.length; i++) {
            let point = polygon1.points[i];
            let normal = lastPoint.vectorTo(point).getNormal();
            // projection shape 1 
            let min1 = Infinity;
            let max1 = -Infinity;
            polygon1.points.forEach(point => {
                let dot = point.dotProduct(normal) / normal.getMagnitude();
                min1 = Math.min(min1, dot);
                max1 = Math.max(max1, dot);
            });
            // projection shape 2 
            let min2 = Infinity;
            let max2 = -Infinity;
            polygon2.points.forEach(point => {
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
    static potentialCollision(obj1, obj2) {
        obj1.translatePoints();
        obj2.translatePoints();
        let center1 = obj1.centerPos;
        let center2 = obj2.centerPos;
        let distance = Formeln_1.default.distance(center1, center2);
        let furthest1 = Formeln_1.default.distance(center1, obj1.getFarthestPoint());
        let furthest2 = Formeln_1.default.distance(center2, obj2.getFarthestPoint());
        return (distance < (furthest1 + furthest2));
    }
}
exports.default = SAT;
