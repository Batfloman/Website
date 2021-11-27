import Vector2f from "../util/Vector2f";
import SceneObject from "./SceneObject";

export default class GameObject extends SceneObject {    
    pos: Vector2f;

    overlapsPoint(point): boolean { return false;}
    touches(objClass): boolean { return false};
    
    // ===== getter & setter =====

    // pos
    setX(x: number) { this.pos.x = x;}
    setY(y: number) { this.pos.y = y;}
    setPos(pos: Vector2f) { this.pos = pos;}

    getX(): number { return this.pos.x;}
    getY(): number { return this.pos.y;}
    getPos(): Vector2f { return this.pos;}

}