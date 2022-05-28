import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import Polygon2Helper from "../algorithms/Polygon2Helper.js";
import { HitBox } from "./HitBox.js";
export default class Polygon2 extends HitBox {
    constructor(model) {
        super();
        this.model = new Array();
        this.model = model;
        this.farthestDistance = Util.farthestPoint(new Vector2(), this.model).getMagnitude();
        this.isConvex = Polygon2Helper.testConvex(this);
    }
    centerModel() {
        const realCenter = this.findCenter();
        this.model.forEach((point) => {
            point.x -= Math.round(realCenter.x * 100) / 100;
            point.y -= Math.round(realCenter.y * 100) / 100;
        });
        this.farthestDistance = Util.farthestPoint(new Vector2(), this.model).getMagnitude();
    }
    findCenter() {
        let center = new Vector2();
        this.model.forEach((point) => {
            center = center.add(point);
        });
        return center.scale(1 / this.model.length);
    }
    translatePoints(pos, orientation) {
        return Polygon2Helper.translatePoints(this.model, pos, orientation);
    }
    scale(scalar) {
        this.model.forEach(point => {
            point = point.scale(scalar);
        });
    }
}
