import WorldObject from "../../assets/WorldObject.js";
import CircleCollision from "./CircleCollision.js";
import Triangulation from "./Triangulation.js";
export default class SAT {
    static testCollision(obj1, obj2) {
        if (!CircleCollision.potentialCollision(obj1, obj2))
            return false;
        if (obj1.hitBox.isConvex) {
            if (obj2.hitBox.isConvex) {
                return this.areColliding(obj1, obj2) && this.areColliding(obj2, obj1);
            }
            else {
                let parts = Triangulation.triangulate(obj2.hitBox.model);
                let collides = false;
                for (let part of parts) {
                    let obj2part = new WorldObject(obj1.pos, part, obj1.orientation);
                    collides = SAT.testCollision(obj1, obj2part);
                    if (collides)
                        return true;
                }
            }
        }
        else {
            let parts = Triangulation.triangulate(obj1.hitBox.model);
            let collides = false;
            for (let part of parts) {
                let obj1part = new WorldObject(obj1.pos, part, obj1.orientation);
                if (obj2.hitBox.isConvex) {
                    collides = SAT.testCollision(obj1part, obj2);
                    if (collides)
                        return true;
                }
                else {
                    for (let part of parts) {
                        let obj2part = new WorldObject(obj1.pos, part, obj1.orientation);
                        collides = SAT.testCollision(obj1part, obj2part);
                        if (collides)
                            return true;
                    }
                }
            }
        }
        return false;
    }
    static areColliding(polygon1, polygon2) {
        let points1 = polygon1.translatePoints();
        let points2 = polygon2.translatePoints();
        let lastPoint = points1[points1.length - 1];
        for (let i = 0; i < points1.length; i++) {
            let point = points1[i];
            let normal = lastPoint.vectorTo(point).getNormal();
            let min1 = Infinity;
            let max1 = -Infinity;
            points1.forEach((point) => {
                let dot = point.dotProduct(normal) / normal.getMagnitude();
                min1 = Math.min(min1, dot);
                max1 = Math.max(max1, dot);
            });
            let min2 = Infinity;
            let max2 = -Infinity;
            points2.forEach((point) => {
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
