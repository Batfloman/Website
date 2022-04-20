export default class Point {
    constructor(pos, connected) {
        this.connectedTo = new Array();
        this.vec = pos;
        this.connectedTo = !connected ? new Array() : connected;
    }
    connectTo(point) {
        this.connectedTo.push(point);
    }
}
