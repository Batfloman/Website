import SceneObject from "./SceneObject.js";
import Vector2f from "./../util/Vector2f.js";

export default class GameObject extends SceneObject {
    /** @type {Vector2f} */
    pos;

    overlapsPoint(point) { return false;}
    
    changeX(x) { this.pos.x += x;}
    changeY(y) { this.pox.y += y;}

    getX() { return this.pos.x;}
    getY() { return this.pos.y;}
    getPos() {return this.pos;}

    setX(x) {this.pos.x = x;}
    setY(y) {this.pos.y = y;}
    setPos(pos) {this.pos = pos;}

}