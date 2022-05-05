import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import SAT from "../physic/algorithms/SAT.js";
import Util from "../util/Util.js";
import { SceneObject } from "./SceneObject.js";
export class WorldObject extends SceneObject {
    constructor(pos, hitBox, angle) {
        super();
        this.pos = pos;
        this.hitBox = hitBox;
        this.orientation = !angle ? 0 : angle;
        this.translatePoints();
    }
    checkCollision(other) {
        return SAT.testCollision(this, other);
    }
    ;
    moveDirection(direction, distance) {
        this.pos = Util.moveDirection(this.pos, direction, distance);
    }
    move(move) {
        this.pos = this.pos.add(move);
    }
    translatePoints() {
        this.points = Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
        return this.points;
    }
}
