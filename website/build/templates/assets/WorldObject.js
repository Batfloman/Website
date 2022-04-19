import { SceneObject } from "./SceneObject.js";
import Formeln from "../Formeln.js";
import SAT from "../physic/2d/collision/SAT.js";
import CircleCollision from "../physic/2d/collision/CircleCollision.js";
export default class WorldObject extends SceneObject {
    constructor(center, hitBox) {
        super();
        this.pos = center;
        this.hitBox = hitBox;
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
        return this.hitBox.translatePoints(this.pos);
    }
    isOnScreen() {
        return CircleCollision.potentialCollision(this, this.getCamara()) && SAT.testCollision(this, this.getCamara());
    }
    calcPosOnScreen() {
        return this.pos.subtract(this.getCamara().offset);
    }
    rotate(degree) {
        this.hitBox.rotate(degree);
    }
    getFarthestPoint() {
        this.translatePoints();
        return Formeln.farthestPoint(this.pos, this.hitBox.points);
    }
}
