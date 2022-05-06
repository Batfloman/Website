import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import SAT from "../physic/algorithms/SAT.js";
import Util from "../util/Util.js";
import { SceneObject } from "./SceneObject.js";
export default class WorldObject extends SceneObject {
    constructor(pos, hitBox, angle) {
        super();
        this.pos = pos;
        this.hitBox = hitBox;
        this.orientation = !angle ? 0 : angle;
        this.translatePoints();
    }
    update(dt) {
        throw new Error("Method not implemented.");
    }
    render(renderer) {
        throw new Error("Method not implemented.");
    }
    shouldRender() {
        return this.checkCollision(this.game.getCamara());
    }
    checkCollision(other) {
        return SAT.testCollision(this, other);
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
