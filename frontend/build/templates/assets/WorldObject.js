import SceneObject from "./SceneObject.js";
import Vector2 from "../util/Vector2.js";
import Formeln from "../Formeln.js";
import Color from "../util/Color.js";
export default class WorldObject extends SceneObject {
    constructor(centerPos, hitBox) {
        super();
        this.centerPos = centerPos;
        this.hitBox = hitBox;
    }
    render(ctx) {
        let pos = new Vector2(this.centerPos.x - this.canvas.viewOffSet.x, this.centerPos.y - this.canvas.viewOffSet.y);
        ctx.strokeStyle = this.borderColor instanceof Color ? this.borderColor.getRGBValue() : "black";
        ctx.fillStyle = this.fillColor instanceof Color ? this.fillColor.getRGBValue() : "rgba(0, 0, 0, 0)";
        ctx.beginPath();
        let first = this.hitBox.points[0];
        ctx.moveTo(first.x, first.y);
        this.hitBox.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(first.x, first.y);
        ctx.stroke();
    }
    isOnScreen() {
        let screenLeftX = this.canvas.viewOffSet.x;
        let screenRightX = this.canvas.viewOffSet.x + this.canvas.htmlCanvas.width;
        let screenTopY = this.canvas.viewOffSet.y + this.canvas.htmlCanvas.height;
        let screenBottomY = this.canvas.viewOffSet.y;
        this.translatePoints();
        let maxDistance = Formeln.distance(this.centerPos, Formeln.farthestPoint(this.centerPos, this.hitBox.points));
        let isInRangeX = (screenLeftX < (this.centerPos.x + maxDistance)) && ((this.centerPos.x - maxDistance) < screenRightX);
        let isInRangeY = (screenBottomY < (this.centerPos.y + maxDistance)) && ((this.centerPos.y - maxDistance) < screenTopY);
        return (isInRangeX && isInRangeY);
    }
    translatePoints() {
        return this.hitBox.translatePoints(this.centerPos);
    }
    rotate(degree) {
        this.hitBox.rotate(degree);
    }
    getFarthestPoint() {
        this.translatePoints();
        return Formeln.farthestPoint(this.centerPos, this.hitBox.points);
    }
}
