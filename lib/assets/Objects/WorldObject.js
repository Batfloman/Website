"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldObject = void 0;
const Collision_js_1 = require("../../physic/algorithms/Collision.js");
const Util_js_1 = require("../../util/Util.js");
const Chunk_js_1 = require("../worlds/Chunk.js");
const SceneObject_js_1 = require("./SceneObject.js");
class WorldObject extends SceneObject_js_1.SceneObject {
    constructor(pos, hitBox, angle = 0) {
        super();
        this.chunk = new Chunk_js_1.Chunk();
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
    notifyOfClick(worldPos) { }
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
        return Collision_js_1.Collision.testCollision(this, other);
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
        this.move(Util_js_1.Util.toVector(direction, distance));
    }
    move(move) {
        this.pos = this.pos.add(move);
        this.alreadyTranslated = false;
        this.recentlyMoved = true;
    }
}
exports.WorldObject = WorldObject;
