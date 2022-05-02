"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_js_1 = require("../../assets/SceneObject.js");
const Vector2_js_1 = __importDefault(require("../../util/Vector2.js"));
const Formeln2_js_1 = __importDefault(require("../Formeln2.js"));
const SAT_js_1 = __importDefault(require("../collision/SAT.js"));
const CircleCollision_js_1 = __importDefault(require("../collision/CircleCollision.js"));
const Polygon2Helper_js_1 = __importDefault(require("../collision/Polygon2Helper.js"));
class WorldObject2 extends SceneObject_js_1.SceneObject {
    constructor(center, hitBox, startAngle) {
        super();
        this.pos = center;
        this.hitBox = hitBox;
        this.angle = !startAngle ? 0 : startAngle;
        this.points = this.translatePoints();
    }
    // SceneObject
    update(dt) {
        throw new Error("Method not implemented.");
    }
    render(ctx) {
        throw new Error("Method not implemented.");
    }
    shouldRender() {
        return this.isOnScreen();
    }
    // ICollideable
    touches(obj) {
        throw new Error("Method not implemented.");
    }
    translatePoints() {
        this.points = Polygon2Helper_js_1.default.translatePoints(this.hitBox.model, this.pos, this.angle);
        return this.points;
    }
    isOnScreen() {
        return CircleCollision_js_1.default.potentialCollision(this, this.getCamara()) && SAT_js_1.default.testCollision(this, this.getCamara());
    }
    calcPosOnScreen() {
        return this.getCamara().calcPointPosOnScreen(this.pos);
    }
    calcPointsOnScreen() {
        return this.getCamara().calcPointsPosOnScreen(this.translatePoints());
    }
    rotate(degree) {
        this.angle = (this.angle + degree) % 360;
    }
    getFarthestPoint() {
        let point = Formeln2_js_1.default.farthestPoint(new Vector2_js_1.default(), this.hitBox.model);
        return Polygon2Helper_js_1.default.translatePoint(point, this.pos, this.angle);
    }
}
exports.default = WorldObject2;
