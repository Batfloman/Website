export default class Vector2f {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    getPos() {
        return { x: this.x, y: this.y };
    }
    equals(pos) {
        return pos.x == this.x && pos.y == this.y;
    }
}
