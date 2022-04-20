import Vector3 from "../../util/Vector3.js";
import Point from "../Point.js";
import Polygon3 from "./Polygon3.js";
export default class Cuboid extends Polygon3 {
    constructor(width, heigh, length, startAngle) {
        let model = new Array();
        let p1 = new Vector3(0, 0, 0);
        let p2 = new Vector3(width, 0, 0);
        let p3 = new Vector3(0, heigh, 0);
        let p4 = new Vector3(0, 0, length);
        let p5 = new Vector3(width, heigh, 0);
        let p6 = new Vector3(width, 0, length);
        let p7 = new Vector3(0, heigh, length);
        let p8 = new Vector3(width, heigh, length);
        model.push(new Point(p1, [p2, p3, p4]));
        model.push(new Point(p2, [p1, p5, p6]));
        model.push(new Point(p3, [p1, p5, p7]));
        model.push(new Point(p4, [p1, p6, p7]));
        model.push(new Point(p5, [p2, p3, p8]));
        model.push(new Point(p6, [p2, p4, p8]));
        model.push(new Point(p7, [p3, p4, p8]));
        model.push(new Point(p8, [p5, p6, p7]));
        super(model, startAngle);
        this.centerModel();
    }
}
