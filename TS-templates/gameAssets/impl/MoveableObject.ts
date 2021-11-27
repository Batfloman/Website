import Vector2f from "../../util/Vector2f";
import GameObject from "../GameObject";

export default class MoveableObject extends GameObject {

    move: Vector2f;

    // ===== methods =====

    update(dt: number): void {
        this.pos.x += this.move.x * dt / 1000;
        this.pos.y += this.move.y * dt / 1000;
    }

    // ===== getter & setter =====

    // move
    setMoveX(x: number): void { this.move.x = x;}
    setMoveY(y: number): void { this.move.y = y;}
    setMove(direction: number, speed: number) {
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