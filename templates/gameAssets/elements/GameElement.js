import Vector2f from "../../util/Vector2f.js";

export default class GameElement extends SceneElement{
    
    /** @type {Vector2f} */
    pos;

    overlapsPoint(point) { return false;}
    touches(objClass) { {
        
    }};
    
    // ===== getter & setter =====

    // pos
    setX(x) { this.pos.x = x;}
    setY(y) { this.pos.y = y;}
    setPos(pos) { this.pos = pos;}

    getX() { return this.pos.x;}
    getY() { return this.pos.y;}
    getPos() { return this.pos;}

}