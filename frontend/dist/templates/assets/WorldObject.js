"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __importDefault(require("./SceneObject"));
const Vector2_1 = __importDefault(require("../util/Vector2"));
const Formeln_1 = __importDefault(require("../Formeln"));
const Color_1 = __importDefault(require("../util/Color"));
class WorldObject extends SceneObject_1.default {
    constructor(centerPos, hitBox) {
        super();
        this.centerPos = centerPos;
        this.hitBox = hitBox;
    }
    render(ctx) {
        let pos = new Vector2_1.default(this.centerPos.x - this.canvas.viewOffSet.x, this.centerPos.y - this.canvas.viewOffSet.y);
        ctx.strokeStyle = this.borderColor instanceof Color_1.default ? this.borderColor.getRGBValue() : "black";
        ctx.fillStyle = this.fillColor instanceof Color_1.default ? this.fillColor.getRGBValue() : "rgba(0, 0, 0, 0)";
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
        let maxDistance = Formeln_1.default.distance(this.centerPos, Formeln_1.default.farthestPoint(this.centerPos, this.hitBox.points));
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
        return Formeln_1.default.farthestPoint(this.centerPos, this.hitBox.points);
    }
}
exports.default = WorldObject;
