import Cuboid from "./Cuboid.js";
export default class Cube extends Cuboid {
    constructor(sideLength, startAngle) {
        super(sideLength, sideLength, sideLength, startAngle);
        this.centerModel();
    }
}
