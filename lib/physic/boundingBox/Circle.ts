import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import { HitBox } from "./HitBox.js";

export default class Circle extends HitBox {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
    this.isConvex = true;
    this.farthestDistance = radius;
  }

  // ==========================================================================================
  // from Super classes

  translatePoints(pos: Vector2, orientation: number): Vector2[] {
    throw new Error("HOW TF DO I TRANSLATE A CIRCLE??????");
  }
  scale(scalar: number): void {
    this.radius *= scalar;
  }
}
