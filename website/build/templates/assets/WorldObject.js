import { SceneObject } from "./SceneObject.js";
import Vector2 from "../util/Vector2.js";
import Formeln from "../Formeln.js";
import Color from "../util/Color.js";
export default class WorldObject extends SceneObject {
    constructor(center, hitBox) {
        super();
        this.pos = center;
        this.hitBox = hitBox;
    }
    update(dt) {
        return;
    }
    shouldRender() {
        return this.isOnScreen();
    }
    touches(obj) {
        throw new Error("Method not implemented.");
    }
    render(ctx) {
        let pos = new Vector2(this.pos.x - this.canvas.viewOffSet.x, this.pos.y - this.canvas.viewOffSet.y);
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
        let maxDistance = Formeln.distance(this.pos, Formeln.farthestPoint(this.pos, this.hitBox.points));
        let isInRangeX = (screenLeftX < (this.pos.x + maxDistance)) && ((this.pos.x - maxDistance) < screenRightX);
        let isInRangeY = (screenBottomY < (this.pos.y + maxDistance)) && ((this.pos.y - maxDistance) < screenTopY);
        return (isInRangeX && isInRangeY);
    }
    translatePoints() {
        return this.hitBox.translatePoints(this.pos);
    }
    rotate(degree) {
        this.hitBox.rotate(degree);
    }
    getFarthestPoint() {
        this.translatePoints();
        return Formeln.farthestPoint(this.pos, this.hitBox.points);
    }
}
