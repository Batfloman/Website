"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Formeln_1 = __importDefault(require("../../../Formeln"));
const Vector2_1 = __importDefault(require("../../../util/Vector2"));
class Polygon {
    constructor(model) {
        // points relative to a 0, 0 center with 0° rotation
        this.model = new Array();
        // angle in degree
        this.angle = 0;
        if (!model || !(model instanceof Array))
            throw new Error(`${model} is no valid model`);
        this.model = model;
        this.points = model;
    }
    translatePoints(pos) {
        this.points = new Array();
        this.model.forEach(point => {
            this.points.push(Formeln_1.default.rotateAroundCenter(pos, new Vector2_1.default(Math.round(point.x + pos.x), Math.round(point.y + pos.y)), this.angle));
        });
        return this.points;
    }
    /**
     * offsets all Points to match the "real" center
     */
    centerModel() {
        let centerX = 0;
        let centerY = 0;
        // adds all cordinates together
        this.model.forEach(point => {
            centerX += point.x;
            centerY += point.y;
        });
        // get the "durchschnitt"
        let moveX = centerX / this.model.length;
        let moveY = centerY / this.model.length;
        // offsets the model Points by the offset from the centerpoint to the "real" centerpoint
        // => makes the centerpoint the real centerpoint
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
exports.default = Polygon;
