import Vector2f from "../util/Vector2f.js";

export default class GameObject {
    game;
    canvas;
    
    /** @type {Vector2f} */
    pos;

    init(game) {
        this.game = game;
        this.canvas = game.getCanvas();
    }

    update(dt) { return;}
    render() { return;}

    overlapsPoint(point) { return false;}
    touches(objClass) { return false};
    
    // ===== getter & setter =====

    // pos
    setX(x) { this.pos.x = x;}
    setY(y) { this.pos.y = y;}
    setPos(pos) { this.pos = pos;}

    getX() { return this.pos.x;}
    getY() { return this.pos.y;}
    getPos() { return this.pos;}

}