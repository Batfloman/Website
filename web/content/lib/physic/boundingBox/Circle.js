import { HitBox } from "./HitBox.js";
export default class Circle extends HitBox {
    constructor(radius) {
        super();
        this.radius = radius;
        this.isConvex = true;
        this.farthestDistance = radius;
    }
    translatePoints(pos, orientation) {
        throw new Error("HOW TF DO I TRANSLATE A CIRCLE??????");
    }
    scale(scalar) {
        this.radius *= scalar;
    }
}
