import { Util } from "../../util/Util.js";
import { Vector2 } from "../../util/Vector2.js";
import { Geometry } from "./Geometry.js";

export class Circle extends Geometry {
  radius: number;

  constructor(radius: number = 0) {
    super();
    this.radius = radius;
  }

  // ==========================================================================================
  // from Super classes

  translate(pos: Vector2, orientation: number): Vector2[] {
    return [Util.moveDirection(pos, orientation, this.radius), Util.moveDirection(pos, 360 - orientation, this.radius)];
  }
  scale(scalar: number): void {
    this.radius *= scalar;
  }
}
