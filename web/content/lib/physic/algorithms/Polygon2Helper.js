import Util from "../../util/Util.js";
export default class Polygon2Helper {
    static testConvex(polygon) {
        if (polygon.model.length <= 3)
            return true;
        let windung = Polygon2Helper.findWindung(polygon);
        for (let i = 0; i < polygon.model.length; i++) {
            const a = Util.getItem(polygon.model, i - 1);
            const b = Util.getItem(polygon.model, i);
            const c = Util.getItem(polygon.model, i + 1);
            const ba = a.subtract(b);
            const bc = c.subtract(b);
            if (!Polygon2Helper.isConvex(windung, ba.crossProduct(bc)))
                return false;
        }
        return true;
    }
    static isConvex(windung, crossProduct) {
        if (windung == "clockwise" && crossProduct > 0)
            return true;
        if (windung == "counterclockwise" && crossProduct < 0)
            return true;
        return false;
    }
    static findWindung(polygon) {
        return this.findArea(polygon) < 0 ? "clockwise" : "counterclockwise";
    }
    static findArea(polygon) {
        let area = 0;
        for (let i = 0; i < polygon.model.length; i++) {
            const a = Util.getItem(polygon.model, i);
            const b = Util.getItem(polygon.model, i + 1);
            area += a.x * b.y;
            area -= a.y * b.x;
        }
        return area / 2;
    }
    static translatePoint(point, center, angle = 0) {
        return Util.rotateAroundCenter(center, point.add(center), angle);
    }
    static translatePoints(points, center, angle = 0) {
        const translated = [];
        points.forEach((point) => {
            translated.push(Util.rotateAroundCenter(center, point.add(center), angle));
        });
        return translated;
    }
}
