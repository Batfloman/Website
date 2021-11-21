import SceneObject from "./SceneObject.js";
import Vector2f from "./../util/Vector2f.js";

export default class GameObject extends SceneObject {
    /** @type {Vector2f} */
    pos;
    /** @type {Vector2f} */
    move = new Vector2f(0, 0);

    update(dt) {
        this.pos.x += this.move.x * dt / 1000;
        this.pos.y += this.move.y * dt / 1000;
    }

    overlapsPoint(point) { return false;}
    touches(objClass) {return false};
    
    // ===== getter & setter =====

    // pos
    setX(x) { this.pos.x = x;}
    setY(y) { this.pos.y = y;}
    setPos(pos) { this.pos = pos;}

    getX() { return this.pos.x;}
    getY() { return this.pos.y;}
    getPos() { return this.pos;}

    // move
    setMoveX(x) { this.move.x = x;}
    setMoveY(y) { this.move.y = y;}
    setMove(orientation, speed) {
        this.move.x = Math.sin(orientation * (Math.PI/180)) * speed;
        this.move.y = -Math.cos(orientation * (Math.PI/180)) * speed;
    }

    getMoveX() { return this.move.x;}
    getMoveY() { return this.move.y;}
    getSpeed() { return Math.round( Math.sqrt( Math.pow(this.move.x, 2) + Math.pow(this.move.y, 2)));}
    getOrientation() {
        if(this.move.x > 0 && this.move.y < 0) {
            return -Math.round( Math.atan(this.move.x / this.move.y) * 180 / Math.PI);
        } else if(this.move.x > 0 && this.move.y > 0) {
            return Math.round( Math.atan(this.move.x / this.move.y) * 180 / Math.PI) + 90;
        } else if(this.move.x < 0 && this.move.y > 0) {
            return -Math.round( Math.atan(this.move.x / this.move.y) * 180 / Math.PI) + 180;
        } else {
            return Math.round( Math.atan(this.move.x / this.move.y) * 180 / Math.PI) + 270;
        }
    }
}