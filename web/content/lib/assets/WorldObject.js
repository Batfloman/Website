import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
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
    move(direction, distance) {
        this.pos = Util.moveDirection(this.pos, direction, distance);
    }
    translatePoints() {
        this.points = Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
        return this.points;
    }
}
