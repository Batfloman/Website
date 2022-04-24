import Formeln2 from "../Formeln2.js";
import { ICollideable } from "../propertys/ICollideable.js";
import Polygon2Helper from "./Polygon2Helper.js";

export default class CircleCollision {
  static potentialCollision(obj1: ICollideable, obj2: ICollideable) {
    [obj1, obj2].forEach(obj => obj.translatePoints());

    let centerDistance = Formeln2.distance(obj1.pos, obj2.pos);

    let furthest1 = Formeln2.distance(obj1.pos, Formeln2.farthestPoint(obj1.pos, obj1.translatePoints()));
    let furthest2 = Formeln2.distance(obj2.pos, Formeln2.farthestPoint(obj2.pos, obj2.translatePoints()));
    
    let collision = (centerDistance < (furthest1 + furthest2));
    return collision;
  }

  // static potentialCollision(körper1: ICollideable, körper2: ICollideable) {
  //   [körper1, körper2].forEach(obj => obj.translatePoints());

  //   let distanzMitten = Formeln2.distance(körper1.pos, körper2.pos);

  //   let radius1 = Formeln2.distance(körper1.pos, Formeln2.farthestPoint(körper1.pos, körper1.translatePoints()));
  //   let radius2 = Formeln2.distance(körper2.pos, Formeln2.farthestPoint(körper2.pos, körper2.translatePoints()));
    
  //   let kollidieren = (distanzMitten < (radius1 + radius2));
  //   return kollidieren;
  // }
}