import Vector3 from "../../util/Vector3.js";
import Formeln3 from "../Formeln3.js";
import Point from "../Point.js";
export default class Polygon3 {
    constructor(model, startAngle) {
        this.model = model;
        this.angle = !startAngle ? new Vector3() : startAngle;
    }
    translatePoints(pos) {
        let points = new Array();
        this.model.forEach(point => {
            let newPos = Polygon3.translatePoint(point.vec, pos, this.angle);
            let connected = new Array();
            point.connectedTo.forEach(p => {
                connected.push(Polygon3.translatePoint(p, pos, this.angle));
            });
            points.push(new Point(newPos, connected));
        });
        return points;
    }
    centerModel() {
        let centerX = 0;
        let centerY = 0;
        let centerZ = 0;
        this.model.forEach(point => {
            centerX += point.vec.x;
            centerY += point.vec.y;
            centerZ += point.vec.z;
        });
        let moveX = centerX / this.model.length;
        let moveY = centerY / this.model.length;
        let moveZ = centerZ / this.model.length;
        this.model.forEach(point => {
            point.vec.x -= Math.round(moveX * 100) / 100;
            point.vec.y -= Math.round(moveY * 100) / 100;
            point.vec.z -= Math.round(moveZ * 100) / 100;
        });
    }
    rotate(degrees) {
        this.angle = this.angle.add(degrees);
    }
    static translatePoint(point, pos, angle) {
        return Formeln3.rotateAroundCenter(pos, point.add(pos), angle);
    }
}
