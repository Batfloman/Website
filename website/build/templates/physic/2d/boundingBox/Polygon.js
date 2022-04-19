import Formeln from "../../../Formeln.js";
import Vector2 from "../../../util/Vector2.js";
export default class Polygon {
    constructor(model) {
        this.model = new Array();
        this.angle = 0;
        if (!model || !(model instanceof Array))
            throw new Error(`${model} is no valid model`);
        this.model = model;
        this.points = model;
    }
    translatePoints(pos) {
        this.points = new Array();
        this.model.forEach(point => {
            this.points.push(Formeln.rotateAroundCenter(pos, new Vector2(Math.round(point.x + pos.x), Math.round(point.y + pos.y)), this.angle));
        });
        return this.points;
    }
    getFarthestPoint(pos) {
        return Formeln.farthestPoint(pos, this.translatePoints(pos));
    }
    getClosestPoint(pos) {
        return Formeln.closestPoint(pos, this.translatePoints(pos));
    }
    centerModel() {
        let centerX = 0;
        let centerY = 0;
        this.model.forEach(point => {
            centerX += point.x;
            centerY += point.y;
        });
        let moveX = centerX / this.model.length;
        let moveY = centerY / this.model.length;
        this.model.forEach(point => {
            point.x -= Math.round(moveX * 100) / 100;
            point.y -= Math.round(moveY * 100) / 100;
        });
    }
    setAngle(angle) {
        this.angle = angle;
    }
    rotate(degree) {
        this.angle += degree;
        this.angle %= 360;
    }
}
