import Collision from "../physic/algorithms/Collision.js";
import Util from "../util/Util.js";
import { SceneObject } from "./SceneObject.js";
export class WorldObject extends SceneObject {
    constructor(pos, hitBox, angle = 0) {
        super();
        this.alreadyTranslated = false;
        this.pos = pos;
        this.hitBox = hitBox;
        this.orientation = angle;
    }
    update(dt) {
        this.alreadyTranslated = false;
        this.update2(dt);
    }
    translatePoints() {
        if (!this.alreadyTranslated) {
            this.translatedPoints = this.hitBox.translatePoints(this.pos, this.orientation);
        }
        return this.translatedPoints;
    }
    shouldUpdate() {
        return Util.distance(this.pos, this.game.getCamara().pos) < this.game.maxUpdateDistance;
    }
    shouldRender() {
        return this.isCollidingWith(this.game.getCamara());
    }
    isCollidingWith(other) {
        return Collision.testCollision(this, other);
    }
    rotate(angle) {
        this.orientation += angle;
        this.orientation %= 360;
    }
    moveDirection(direction, distance) {
        this.pos = Util.moveDirection(this.pos, direction, distance);
    }
    move(move) {
        this.pos = this.pos.add(move);
    }
}
