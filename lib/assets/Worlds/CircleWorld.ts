import Util from "../../util/Util";
import Vector2 from "../../util/Vector2";
import World from "./World";

export default class CircleWorld extends World {
  radius: number;

  constructor(radius: number) {
    super();

    this.radius = radius;
  }

  isInsideWorld(point: Vector2): boolean {
    return Util.distance(new Vector2(), point) < this.radius;
  }
}
