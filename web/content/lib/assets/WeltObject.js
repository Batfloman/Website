import Collision from "../physic/algorithms/Collision.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import Util from "../util/Util.js";
import { SceneObject } from "./SceneObject.js";
export class WeltObject extends SceneObject {
    constructor(pos, hitBox, angle) {
        super();
        this.pos = pos;
        this.hitBox = hitBox;
        this.orientation = !angle ? 0 : angle;
    }
    shouldRender() {
        let b = this.checkCollision(this.game.getCamara());
        return b;
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
    translatePoints() {
        return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
    }
    rotate(angle) {
        this.orientation += angle;
        this.orientation %= 360;
    }
}
