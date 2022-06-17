import { Collision } from "../../physic/algorithms/Collision.js";
import { Util } from "../../util/Util.js";
import { Chunk } from "../worlds/Chunk.js";
import { SceneObject } from "./SceneObject.js";
export class WorldObject extends SceneObject {
    constructor(pos, hitBox, angle = 0) {
        super();
        this.chunk = new Chunk();
        this.recentlyMoved = true;
        this.alreadyTranslated = false;
        this.pos = pos;
        this.hitBox = hitBox;
        this.orientation = angle;
    }
    shouldUpdate() {
        return true;
    }
    shouldRender() {
        return this.isCollidingWith(this.camara);
    }
    setWorld(world) {
        this.world = world;
        this.recentlyMoved = true;
    }
    setChunk(chunk) {
        this.chunk = chunk;
        this.recentlyMoved = false;
    }
    getChunk() {
        return this.chunk;
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
        this.move(Util.toVector(direction, distance));
    }
    move(move) {
        this.pos = this.pos.add(move);
        this.alreadyTranslated = false;
        this.recentlyMoved = true;
    }
}
