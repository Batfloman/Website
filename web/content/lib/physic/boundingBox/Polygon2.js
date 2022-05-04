import Vector2 from "../../util/Vector2.js";
import Polygon2Helper from "../algorithms/Polygon2Helper.js";
export default class Polygon2 {
    constructor(model, startAngle) {
        this.model = new Array();
        this.angle = 0;
        this.model = model;
        this.isConvex = Polygon2Helper.isConvex(this);
        this.angle = !startAngle ? 0 : startAngle;
    }
    centerModel() {
        let realCenter = this.findCenter();
        this.model.forEach(point => {
            point.x -= Math.round(realCenter.x * 100) / 100;
            point.y -= Math.round(realCenter.y * 100) / 100;
        });
    }
    findCenter() {
        let center = new Vector2(0, 0);
        this.model.forEach(point => {
            center = center.add(point);
        });
        let realCenter = center.scale(1 / this.model.length);
        return realCenter;
    }
}
