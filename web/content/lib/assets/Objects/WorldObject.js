import Collision from "../../physic/algorithms/Collision.js";
import Util from "../../util/Util.js";
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
        if (Util.distance(this.pos, this.game.getCamara().pos) > this.game.deleteDistance) {
            this.game.removeObject(this);
            return;
        }
        this.update2(dt);
    }
    shouldUpdate() {
        return Util.distance(this.pos, this.game.getCamara().pos) < this.game.maxUpdateDistance;
    }
    shouldRender() {
        return this.isCollidingWith(this.game.getCamara());
    }
    setWorld(world) {
        this.world = world;
    }
    setChunk(chunk) {
        this.chunk = chunk;
    }
    translatePoints() {
        if (this.alreadyTranslated)
            return this.translatedPoints;
        this.translatedPoints = this.hitBox.translatePoints(this.pos, this.orientation);
        return this.translatedPoints;
    }
    isCollidingWith(other) {
        return Collision.testCollision(this, other);
    }
    rotate(angle) {
        this.orientation += angle;
        this.orientation %= 360;
        this.alreadyTranslated = false;
    }
    moveDirection(direction, distance) {
        this.pos = Util.moveDirection(this.pos, direction, distance);
        this.alreadyTranslated = false;
    }
    move(move) {
        this.pos = this.pos.add(move);
        this.alreadyTranslated = false;
    }
}
