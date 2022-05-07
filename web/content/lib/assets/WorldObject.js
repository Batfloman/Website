import Collision from "../physic/algorithms/Collision.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
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
    shouldRender() {
        return this.checkCollision(this.game.getCamara());
    }
    checkCollision(other) {
        return Collision.testCollision(this, other);
    }
    translatePoints() {
        return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
    }
    moveDirection(direction, distance) {
        this.pos = Util.moveDirection(this.pos, direction, distance);
    }
    move(move) {
        this.pos.add(move);
    }
}
