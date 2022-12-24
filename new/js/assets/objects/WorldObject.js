import { Collision } from "../../physic/algorithms/Collision.js";
import { Util } from "../../util/Util.js";
import { Chunk } from "../worlds/Chunk.js";
export class WorldObject extends SceneObject {
    constructor(pos, hitBox, angle = 0) {
        super();
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
    notifyOfClick(worldPos) { }
    // ==========================================================================================
    //#region world
    world;
    chunk = new Chunk();
    recentlyMoved = true;
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
    //#endregion
    // ==========================================================================================
    // #region collision and so
    pos;
    hitBox;
    orientation;
    translatedPoints;
    alreadyTranslated = false;
    translatePoints() {
        if (this.alreadyTranslated)
            return this.translatedPoints;
        this.translatedPoints = this.hitBox.translate(this.pos, this.orientation);
        return this.translatedPoints;
    }
    isCollidingWith(other) {
        return Collision.testCollision(this, other);
    }
    //#endregion
    // ==========================================================================================
    // #region move Object
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
