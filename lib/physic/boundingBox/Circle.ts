import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import { HitBox } from "./HitBox.js";

export default class Circle extends HitBox {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
    this.isConvex = true;
    this.farthestPoint = Util.moveDirection(new Vector2(), 0, radius);
  }
}