import Formeln from "../2d/Formeln2.js";
export default class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = !x ? 0 : x;
        this.y = !y ? 0 : y;
    }
    add(vec2) {
        return new Vector2(this.x + vec2.x, this.y + vec2.y);
    }
    subtract(vec2) {
        return new Vector2(this.x - vec2.x, this.y - vec2.y);
    }
    dotProduct(vec2) {
        return (this.x * vec2.x) + (this.y * vec2.y);
    }
    crossProduct(vec2) {
        return (this.x * vec2.y) - (vec2.x * this.y);
    }
    vectorTo(point) {
        return new Vector2(Math.round(point.x - this.x), Math.round(point.y - this.y));
    }
    getNormal() {
        return new Vector2(-this.y, this.x);
    }
    getMagnitude() {
        return Formeln.calcHypothenuse(this.x, this.y);
    }
}
