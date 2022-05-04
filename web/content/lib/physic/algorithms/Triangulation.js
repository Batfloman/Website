import Util from "../../util/Util.js";
import Polygon2 from "../boundingBox/Polygon2.js";
export default class Triangulation {
    static triangulate(vertices) {
        let indexList = new Array();
        for (let i = 0; i < vertices.length; i++) {
            indexList.push(i);
        }
        let totalTriangleCount = vertices.length - 2;
        let totalTirangleIndexCount = totalTriangleCount * 3;
        let tirangles = new Array();
        ;
        let currentTirangleIndexCount = 0;
        while (indexList.length > 3) {
            for (let i = 0; i < indexList.length; i++) {
                let a = indexList[i];
                let b = Util.getItem(indexList, i - 1);
                let c = Util.getItem(indexList, i + 1);
                let va = vertices[a];
                let vb = vertices[b];
                let vc = vertices[c];
                let va_to_vb = vb.subtract(va);
                let va_to_vc = vc.subtract(va);
                if (va_to_vb.crossProduct(va_to_vc) > 0)
                    continue;
                let isEar = true;
                for (let j = 0; j < vertices.length; j++) {
                    if (j == a || j == b || j == c)
                        continue;
                    let p = vertices[j];
                    if (Triangulation.isPointInTriangle(p, vb, va, vc)) {
                        isEar = false;
                        break;
                    }
                }
                if (isEar) {
                    tirangles.push(new Polygon2([va, vb, vc]));
                    indexList.splice(i, 1);
                    break;
                }
            }
        }
        tirangles.push(new Polygon2([vertices[indexList[0]], vertices[indexList[1]], vertices[indexList[2]]]));
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
