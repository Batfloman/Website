import Formeln from "../../../Formeln.js";
import { ICollideable } from "../../../propertys/ICollideable.js";

export default class CircleCollision {
  static potentialCollision(obj1: ICollideable, obj2: ICollideable) {
    [obj1, obj2].forEach(obj => obj.translatePoints());

    let centerDistance = Formeln.distance(obj1.pos, obj2.pos);

    let furthest1 = Formeln.distance(obj1.pos, obj1.hitBox.getFarthestPoint(obj1.pos));
    let furthest2 = Formeln.distance(obj2.pos, obj2.hitBox.getFarthestPoint(obj2.pos));
    
    let collision = (centerDistance < (furthest1 + furthest2));
    return collision;
  }
}