import ICollideable from "../property/ICollideable.js";
import CircleCollision from "./CircleCollision.js";
import SAT from "./SAT.js";
import Triangulation from "./Triangulation.js";

export default class Collision {
  static testCollision(obj1: ICollideable, obj2: ICollideable) {
    if (!CircleCollision.potentialCollision(obj1, obj2)) return false;

    if (!obj1.hitBox.isConvex) {
      const parts = Triangulation.triangulate(obj1);
      for (let part of parts) {
        if (SAT.testCollision(part, obj2)) return true;
      }
      return false;
    }
    if (!obj2.hitBox.isConvex) {
      const parts = Triangulation.triangulate(obj2);
      for (let part of parts) {
        if (SAT.testCollision(obj1, part)) return true;
      }
      return false;
    }

    return SAT.testCollision(obj1, obj2);
  }
}
