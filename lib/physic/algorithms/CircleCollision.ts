import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import ICollideable from "../property/ICollideable.js";
import Polygon2Helper from "./Polygon2Helper.js";

export default class CircleCollision {
  static potentialCollision(obj1: ICollideable, obj2: ICollideable) {
    [obj1, obj2].forEach((obj) => obj.translatePoints());

    let furthest1 = Util.distance(
      obj1.pos,
      Util.farthestPoint(obj1.pos, obj1.translatePoints())
    );
    let furthest2 = Util.distance(
      obj2.pos,
      Util.farthestPoint(obj2.pos, obj2.translatePoints())
    );

    return this.circleCollision(
      obj1.pos,
      obj1.hitBox.farthest.getMagnitude(),
      obj2.pos,
      obj2.hitBox.farthest.getMagnitude()
    );
  }

  static circleCollision(c1: Vector2, r1: number, c2: Vector2, r2: number) {
    return Util.distance(c1, c2) < r1 + r2;
  }
}
