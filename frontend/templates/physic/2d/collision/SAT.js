import WorldObject from "../../../assets/WorldObject.js";
import Formeln from "../../../Formeln.js";
import Polygon from "./../boundingBox/Polygon.js";

// Separating Axis Theorem

export default class SAT {
  /**
   * 
   * @param {WorldObject} obj1 
   * @param {WorldObject} obj2 
   */
  static testCollision(obj1, obj2) {
    if(!obj1 || !obj2 || !(obj1 instanceof WorldObject) || !(obj2 instanceof WorldObject)) throw new Error("Worldobjects expected!"); 

    obj1.translatePoints();
    obj2.translatePoints();
    
    let polygon1 = obj1.hitBox;
    let polygon2 = obj2.hitBox;

    return this.areColliding(polygon1, polygon2) && this.areColliding(polygon2, polygon1);
  }

  static areColliding(polygon1, polygon2) {
    let lastPoint = polygon1.points[polygon1.points.length - 1];
    
    for(let i = 0; i < polygon1.points.length; i++) {
      let point = polygon1.points[i];

      let vecBetween = lastPoint.vectorTo(point);
      let normal = vecBetween.getNormal();

      // project shape 1 

      let min1 = Infinity;
      let max1 = -Infinity

      polygon1.points.forEach(point => {
        let dot = point.dotProduct(normal);
        min1 = Math.min(min1, dot);
        max1 = Math.max(max1, dot);
      })

      // project shape 2 

      let min2 = Infinity;
      let max2 = -Infinity

      polygon2.points.forEach(point => {
        let dot = point.dotProduct(normal);
        min2 = Math.min(min2, dot);
        max2 = Math.max(max2, dot);
      })

      if(!(max2 >= min1 && max1 >= min2)) return false;

      lastPoint = point;
    }
    return true;
  }

  static potentialCollision(obj1, obj2) {
    obj1.translatePoints();
    obj2.translatePoints();

    let center1 = obj1.centerPos;
    let center2 = obj2.centerPos;
    let distance = Formeln.distance(center1, center2);
    let furthest1 = Formeln.distance(center1, obj1.getFarthestPoint());
    let furthest2 = Formeln.distance(center2, obj2.getFarthestPoint());
    
    return (distance < (furthest1 + furthest2));
  }
}