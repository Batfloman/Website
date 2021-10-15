export default class Position {
    x;
    y;

    constructor(x, y) {
        this.x = x != null | undefined ? x : 0;
        this.y = y != null | undefined ? y : 0;;
    }
}