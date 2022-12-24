import { Util } from "../../util/Util.js";
import { Vector2 } from "../../util/Vector2.js";
import { Polygon2Helper } from "../algorithms/Polygon2Helper.js";
import { Geometry } from "./Geometry.js";
export class Polygon2 extends Geometry {
    // points relative to a (0|0) center with 0° rotation
    model = new Array();
    constructor(model) {
        super();
        this.model = model;
    }
    /**
     * offsets all Points to match the "real" center
     */
    centerModel() {
        const realCenter = this.findCenter();
        this.model.forEach((point) => {
            point.x -= Util.math.round(realCenter.x, 2);
            point.y -= Util.math.round(realCenter.y, 2);
        });
    }
    findCenter() {
        let center = new Vector2();
        for (let point of this.model) {
            center = center.add(point);
        }
        return center.scale(1 / this.model.length);
    }
    // ==========================================================================================
    // from Super classes
    translate(pos, orientation) {
        return Polygon2Helper.translatePoints(this.model, pos, orientation);
    }
    scale(scalar) {
        this.model.forEach((point) => {
            point = point.scale(scalar);
        });
    }
}
