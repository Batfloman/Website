import WorldObject from "../../../assets/WorldObject.js";
import Formeln from "../../../Formeln.js";
import Polygon from "../boundingBox/Polygon.js";

// Separating Axis Theorem

export default class SAT {

  static testCollision(obj1: WorldObject, obj2: WorldObject) {
    [obj1, obj2].forEach(obj => obj.translatePoints())
    
    let polygon1 = obj1.hitBox;
    let polygon2 = obj2.hitBox;
    
    return this.areColliding(polygon1, polygon2) && this.areColliding(polygon2, polygon1);
  }

  /**
   * Tests all Sides of polygon 1 with SAT agaings polygon 2
   * Returns false if a gap is found - else true
   */
  static areColliding(polygon1: Polygon, polygon2: Polygon) {
    let lastPoint = polygon1.points[polygon1.points.length - 1];
    
    for(let i = 0; i < polygon1.points.length; i++) {
      let point = polygon1.points[i];

      let normal = lastPoint.vectorTo(point).getNormal();
      // projection shape 1 

      let min1 = Infinity;
      let max1 = -Infinity;

      polygon1.points.forEach(point => {
        let dot = point.dotProduct(normal) / normal.getMagnitude();
        min1 = Math.min(min1, dot);
        max1 = Math.max(max1, dot);
      })

      // projection shape 2 

      let min2 = Infinity;
      let max2 = -Infinity;

      polygon2.points.forEach(point => {
        let dot = point.dotProduct(normal) / normal.getMagnitude();
        min2 = Math.min(min2, dot);
        max2 = Math.max(max2, dot);
      })

      if(!(max2 >= min1 && max1 >= min2)) return false;

      lastPoint = point;
    }
    return true;
  }

  static potentialCollision(obj1: WorldObject, obj2: WorldObject) {
    obj1.translatePoints();
    obj2.translatePoints();

    let center1 = obj1.pos;
    let center2 = obj2.pos;
    let distance = Formeln.distance(center1, center2);
    let furthest1 = Formeln.distance(center1, obj1.getFarthestPoint());
    let furthest2 = Formeln.distance(center2, obj2.getFarthestPoint());
    
    return (distance < (furthest1 + furthest2));
  }
}