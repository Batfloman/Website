import { Util } from "../../util/Util.js";
import { Geometry } from "./Geometry.js";
export class Circle extends Geometry {
    radius;
    constructor(radius = 0) {
        super();
        this.radius = radius;
    }
    // ==========================================================================================
    // from Super classes
    translate(pos, orientation) {
        return [Util.moveDirection(pos, orientation, this.radius), Util.moveDirection(pos, 360 - orientation, this.radius)];
    }
    scale(scalar) {
        this.radius *= scalar;
    }
}
