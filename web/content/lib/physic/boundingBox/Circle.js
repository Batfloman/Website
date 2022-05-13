import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import { HitBox } from "./HitBox.js";
export default class Circle extends HitBox {
    constructor(radius) {
        super();
        this.radius = radius;
        this.isConvex = true;
        this.farthestPoint = Util.moveDirection(new Vector2(), 0, radius);
    }
    translatePoints(pos, orientation) {
        throw new Error("HOW TF DO I TRANSLATE A CIRCLE??????");
    }
    scale(scalar) {
        this.radius *= scalar;
    }
}
