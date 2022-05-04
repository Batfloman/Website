import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import Polygon2 from "../boundingBox/Polygon2.js";

export default class Polygon2Helper {
  static isConvex(polygon: Polygon2): boolean {
    let windung = "right";
    let a = Util.getItem(polygon.model, -1);
    let b = Util.getItem(polygon.model, 0);
    let c = Util.getItem(polygon.model, 1);
    let ab = b.subtract(a);
    let bc = c.subtract(b);
    if (ab.crossProduct(bc) < 0) {
      windung = "left";
    }

    for (let i = 0; i < polygon.model.length; i++) {
      let a = Util.getItem(polygon.model, i - 1);
      let b = Util.getItem(polygon.model, i);
      let c = Util.getItem(polygon.model, i + 1);

      let ab = b.subtract(a);
      let bc = c.subtract(b);

      if (windung == "right" && ab.crossProduct(bc) < 0) return false;
      else if (windung == "left" && ab.crossProduct(bc) > 0) return false;
    }

    return true;
  }

  static translatePoint(point: Vector2,center: Vector2,angle?: number): Vector2 {
    return Util.rotateAroundCenter(center, point.add(center), !angle ? 0 : angle);
  }

  static translatePoints(points: Vector2[],center: Vector2,angle?: number): Vector2[] {
    let translated: Vector2[] = [];

    points.forEach(point => {
      translated.push(
        Util.rotateAroundCenter(center, point.add(center), !angle ? 0 : angle)
      );
    });

    return translated;
  }
}
