import Util from "../../util/Util.js";
import Formeln2 from "../Formeln2.js";
export default class Polygon2Helper {
    static isConvex(polygon) {
        let windung = "right";
        let a = Util.getItem(polygon.model, -1);
        let b = Util.getItem(polygon.model, 0);
        let c = Util.getItem(polygon.model, 1);
        let ab = b.subtract(a);
        let bc = c.subtract(b);
        if (ab.crossProduct(bc) < 0) {
            windung = "left";
        }
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
        return Formeln2.rotateAroundCenter(center, point.add(center), angle);
    }
    static translatePoints(points, center, angle) {
        let p = new Array();
        points.forEach(point => {
            p.push(Formeln2.rotateAroundCenter(center, point.add(center), !angle ? 0 : angle));
        });
        return p;
    }
}
