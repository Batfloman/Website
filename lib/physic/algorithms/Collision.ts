import ICollideable from "../property/ICollideable.js";
import CircleCollision from "./CircleCollision.js";
import SAT from "./SAT.js";
import Triangulation from "./Triangulation.js";

export default class Collision {
  static testCollision(obj1: ICollideable, obj2: ICollideable) {
    if (!CircleCollision.potentialCollision(obj1, obj2)) return false;

    if (obj1.hitBox.isConvex) {
      if (obj2.hitBox.isConvex) {
        return SAT.testCollision(obj1, obj2);
      } else {
        const parts = Triangulation.triangulate(obj2);
        for (let part of parts) {
          if (SAT.testCollision(obj1, part)) return true;
        }
      }
    } else {
      const parts = Triangulation.triangulate(obj1);
      for (let part of parts) {
        if (obj2.hitBox.isConvex) {
          if (SAT.testCollision(part, obj2)) return true;
        } else {
          let parts2 = Triangulation.triangulate(obj2);
          for (let part2 of parts2) {
            if (SAT.testCollision(part, part2)) return true;
          }
        }
      }
    }
    return false;
  }
}
