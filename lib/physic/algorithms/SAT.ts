import ICollideable from "../property/ICollideable.js";
import Triangulation from "./Triangulation.js";

// Separating Axis Theorem
export default class SAT {
  static testCollision(obj1: ICollideable, obj2: ICollideable) {
    if(obj1.hitBox.isConvex) {
      if(obj2.hitBox.isConvex) {
        return this.areColliding(obj1, obj2) && this.areColliding(obj2, obj1);
      } else {
        let parts = Triangulation.triangulate(obj2.hitBox.model);
        for(let part of parts) {
          console.log(parts);
        }
      }
    } else {
      let parts = Triangulation.triangulate(obj1.hitBox.model);
      for(let part of parts) {
        if(obj2.hitBox.isConvex) {

        } else {
          
        }
      }
    }
  }

  /**
   * Tests all Sides of polygon 1 with SAT agaings polygon 2
   * Returns false if a gap is found - else true
   */
  private static areColliding(polygon1: ICollideable, polygon2: ICollideable) {
    let points1 = polygon1.translatePoints();
    let points2 = polygon2.translatePoints();

    let lastPoint = points1[points1.length - 1];

    for (let i = 0; i < points1.length; i++) {
      let point = points1[i];

      let normal = lastPoint.vectorTo(point).getNormal();
      // projection shape 1

      let min1 = Infinity;
      let max1 = -Infinity;

      points1.forEach((point) => {
        let dot = point.dotProduct(normal) / normal.getMagnitude();
        min1 = Math.min(min1, dot);
        max1 = Math.max(max1, dot);
      });

      // projection shape 2

      let min2 = Infinity;
      let max2 = -Infinity;

      points2.forEach((point) => {
        let dot = point.dotProduct(normal) / normal.getMagnitude();
        min2 = Math.min(min2, dot);
        max2 = Math.max(max2, dot);
      });

      if (!(max2 >= min1 && max1 >= min2)) return false;

      lastPoint = point;
    }
    return true;
  }
}