import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import Polygon2 from "../boundingBox/Polygon2.js";

type PolygonWindung = "clockwise" | "counterclockwise";

export default class Polygon2Helper {
  /**
   * Test a polygon for convexity
   */
  static testConvex(polygon: Polygon2): boolean {
    if (polygon.model.length <= 3) return true;

    let windung = Polygon2Helper.findWindung(polygon);

    for (let i = 0; i < polygon.model.length; i++) {
      const a = Util.getItem(polygon.model, i - 1);
      const b = Util.getItem(polygon.model, i);
      const c = Util.getItem(polygon.model, i + 1);

      const ba = a.subtract(b);
      const bc = c.subtract(b);

      if (!Polygon2Helper.isConvex(windung, ba.crossProduct(bc))) return false;
    }
    return true;
  }

  static isConvex(windung: PolygonWindung, crossProduct: number) {
    if (windung == "clockwise" && crossProduct > 0) return true;
    if (windung == "counterclockwise" && crossProduct < 0) return true;
    return false;
  }

  /**
   * Returns the "windung" of an Polygon
   * if "left" => the crossProduct of two adjacent Vectors needs to be positive
   *  to make the angle between them convex
   * if "right" => the crossProducct needs to be negative
   */
  static findWindung(polygon: Polygon2): PolygonWindung {
    // const a = Util.getItem(polygon.model, -1);
    // const b = Util.getItem(polygon.model, 0);
    // const c = Util.getItem(polygon.model, 1);
    
    // const ba = a.subtract(b);
    // const bc = c.subtract(b);
    
    // return ba.crossProduct(bc) > 0 ? "clockwise" : "counterclockwise";
    return this.findArea(polygon) < 0 ? "clockwise" : "counterclockwise";
  }

  static findArea(polygon: Polygon2): number {
    let area = 0;
    for(let i = 0; i < polygon.model.length; i++) {
      const a = Util.getItem(polygon.model, i);
      const b = Util.getItem(polygon.model, i+1);

      area += a.x * b.y;
      area -= a.y * b.x;
    }

    return area / 2;
  }

  /**
   * Translates a point and returns the new Position
   */
  static translatePoint(point: Vector2, center: Vector2, angle: number = 0): Vector2 {
    return Util.rotateAroundCenter(center, point.add(center), angle);
  }

  static translatePoints(points: Vector2[], center: Vector2, angle: number = 0): Vector2[] {
    const translated: Vector2[] = [];

    points.forEach((point) => {
      translated.push(Util.rotateAroundCenter(center, point.add(center), angle));
    });

    return translated;
  }
}
