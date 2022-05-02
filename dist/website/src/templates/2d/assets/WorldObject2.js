import { SceneObject } from "../../assets/SceneObject.js";
import Vector2 from "../../util/Vector2.js";
import Formeln from "../Formeln2.js";
import SAT from "../collision/SAT.js";
import CircleCollision from "../collision/CircleCollision.js";
import Polygon2Helper from "../collision/Polygon2Helper.js";
export default class WorldObject2 extends SceneObject {
    constructor(center, hitBox, startAngle) {
        super();
        this.pos = center;
        this.hitBox = hitBox;
        this.angle = !startAngle ? 0 : startAngle;
        this.points = this.translatePoints();
    }
    update(dt) {
        throw new Error("Method not implemented.");
    }
    render(ctx) {
        throw new Error("Method not implemented.");
    }
    shouldRender() {
        return this.isOnScreen();
    }
    touches(obj) {
        throw new Error("Method not implemented.");
    }
    translatePoints() {
        this.points = Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.angle);
        return this.points;
    }
    isOnScreen() {
        return CircleCollision.potentialCollision(this, this.getCamara()) && SAT.testCollision(this, this.getCamara());
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
        let point = Formeln.farthestPoint(new Vector2(), this.hitBox.model);
        return Polygon2Helper.translatePoint(point, this.pos, this.angle);
    }
}
