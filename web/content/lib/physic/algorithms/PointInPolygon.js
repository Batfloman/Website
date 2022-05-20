import Util from "../../util/Util";
export default class PointInPolygon {
    isPointInPolygon(p, obj) {
        const points = obj.translatePoints();
        for (let i = 0; i < points.length; i++) {
            const a = Util.array.getItem(points, i);
            const b = Util.array.getItem(points, i - 1);
            const c = Util.array.getItem(points, i + 1);
        }
        const ab = b.subtract(a);
        const bc = c.subtract(b);
        const ca = a.subtract(c);
        const ap = p.subtract(a);
        const bp = p.subtract(b);
        const cp = p.subtract(c);
        const cross1 = ab.crossProduct(ap);
        const cross2 = bc.crossProduct(bp);
        const cross3 = ca.crossProduct(cp);
        if (cross1 < 0 || cross2 < 0 || cross3 < 0)
            return false;
        return true;
    }
}
