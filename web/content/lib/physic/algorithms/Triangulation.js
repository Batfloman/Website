import Polygon2 from "../boundingBox/Polygon2.js";
export default class Triangulation {
    static triangulate(obj) {
        let vertices = obj.translatePoints();
        let tirangles = [];
        let indexList = [];
        for (let i = 0; i < vertices.length; i++) {
            indexList.push(i);
        }
        tirangles.push(new Triangle(obj.pos, new Polygon2([
            vertices[indexList[0]],
            vertices[indexList[1]],
            vertices[indexList[2]],
        ]), obj.orientation));
        return tirangles;
    }
    static isPointInTriangle(p, a, b, c) {
        let ab = b.subtract(a);
        let bc = c.subtract(b);
        let ca = a.subtract(c);
        let ap = p.subtract(a);
        let bp = p.subtract(b);
        let cp = p.subtract(c);
        let cross1 = ab.crossProduct(ap);
        let cross2 = bc.crossProduct(bp);
        let cross3 = ca.crossProduct(cp);
        if (cross1 < 0 || cross2 < 0 || cross3 < 0)
            return false;
        return true;
    }
}
class Triangle {
    constructor(pos, hitBox, angle = 0) {
        this.pos = pos;
        this.hitBox = hitBox;
        this.orientation = angle;
    }
    checkCollision(other) {
        throw new Error("Method not implemented.");
    }
    translatePoints() {
        throw new Error("Method not implemented.");
    }
}
