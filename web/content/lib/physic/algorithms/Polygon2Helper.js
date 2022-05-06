import Util from "../../util/Util.js";
export default class Polygon2Helper {
    static isConvex(polygon) {
        if (polygon.model.length <= 3)
            return true;
        let a = Util.getItem(polygon.model, -1);
        let b = Util.getItem(polygon.model, 0);
        let c = Util.getItem(polygon.model, 1);
        let ab = b.subtract(a);
        let bc = c.subtract(b);
        let windung = ab.crossProduct(bc) < 0 ? "left" : "right";
        for (let i = 0; i < polygon.model.length; i++) {
            let a = Util.getItem(polygon.model, i - 1);
            let b = Util.getItem(polygon.model, i);
            let c = Util.getItem(polygon.model, i + 1);
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
        return Util.rotateAroundCenter(center, point.add(center), !angle ? 0 : angle);
    }
    static translatePoints(points, center, angle) {
        let translated = [];
        points.forEach(point => {
            translated.push(Util.rotateAroundCenter(center, point.add(center), !angle ? 0 : angle));
        });
        return translated;
    }
}
