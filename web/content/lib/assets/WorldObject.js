import Collision from "../physic/algorithms/Collision.js";
import Util from "../util/Util.js";
import { SceneObject } from "./SceneObject.js";
export class WorldObject extends SceneObject {
    constructor(pos, hitBox, angle = 0) {
        super();
        this.pos = pos;
        this.hitBox = hitBox;
        this.orientation = angle;
    }
    rotate(angle) {
        this.orientation += angle;
        this.orientation %= 360;
    }
    shouldUpdate() {
        return Util.distance(this.pos, this.game.getCamara().pos) < this.game.maxRenderDistance;
    }
    shouldRender() {
        if (Util.distance(this.pos, this.game.getCamara().pos) < this.game.maxRenderDistance)
            return this.checkCollision(this.game.getCamara());
        return false;
    }
    checkCollision(other) {
        return Collision.testCollision(this, other);
    }
    moveDirection(direction, distance) {
        this.pos = Util.moveDirection(this.pos, direction, distance);
    }
    move(move) {
        this.pos = this.pos.add(move);
    }
}
