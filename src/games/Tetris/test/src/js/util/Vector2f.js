export default class Vector2f {
    x;
    y;
    
    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = !x ? 0 : x;
        this.y = !y ? 0 : y;
    }

    get x() {
        return this.x;
    }

    get y() {
        return this.y;
    }
}