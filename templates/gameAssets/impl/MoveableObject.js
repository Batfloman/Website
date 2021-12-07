import Vector2f from "../../util/Vector2f.js";
import GameObject from "../GameObject.js";

export default class MoveableObject extends GameObject {

    /** @type {Vector2f} */
    move = new Vector2f(0, 0);

    // ===== methods =====

    update(dt) {
        this.pos.x += this.move.x * dt / 1000;
        this.pos.y += this.move.y * dt / 1000;
    }

    // ===== getter & setter =====

    // move
    setMoveX(x) { this.move.x = x;}
    setMoveY(y) { this.move.y = y;}
    setMove(direction, speed) {
        this.move.x = Math.sin(direction * (Math.PI/180)) * speed;
        this.move.y = -Math.cos(direction * (Math.PI/180)) * speed;
    }

    getMoveX() { return this.move.x;}
    getMoveY() { return this.move.y;}
    getSpeed() { return Math.round( Math.sqrt( Math.pow(this.move.x, 2) + Math.pow(this.move.y, 2)));}
    getDirection() {
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