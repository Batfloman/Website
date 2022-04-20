import Vector3 from "../util/Vector3.js";
import Formeln2 from "../2d/Formeln2.js";
import Vector2 from "../util/Vector2.js";

export default class Formeln3 {

  /**
   * Returns the Hypothenuse of a Triangle
   * @param side1 the lenght of the 1. side
   * @param side2 the lenght of the 2. side
   * @param side3 the lenght of the 3. side
   */
  static calcHypothenuse(side1: number, side2: number, side3: number): number {
    return Math.sqrt((Math.pow(side1, 2) + Math.pow(side2, 2) + Math.pow(side3, 2)));
  }

  /**
   * Returns the distance between to Points
   * @param point1 
   * @param point2 
   */
  static distance(point1: Vector3, point2: Vector3): number {
    return Formeln3.calcHypothenuse(
      point1.x - point2.x,
      point1.y - point2.y,
      point1.z - point2.z
    );
  }

  /**
   * Returns the closest Point to the mainPoint
   * @param mainPoint point from which the distance will be measured
   * @param points collection of Points that will be tested
   * @param exclude point(s) that will be excluded
   */
  static closestPoint(mainPoint: Vector3, points: Vector3[], exclude?: (Vector3 | Vector3[])): Vector3 {
    let closest: Vector3 = new Vector3(Infinity, Infinity, Infinity);
    let closestDistance: number = Infinity;
    points.forEach(point => {
      if (mainPoint == point) return;
      if (exclude instanceof Vector3 && point == exclude) return;
      if (exclude instanceof Array && exclude.includes(point)) return;

      let distance = Formeln3.distance(mainPoint, point);
      if (!closest || !closestDistance || distance < closestDistance) {
        closest = point;
        closestDistance = distance;
      }
    })
    return closest;
  }

  /**
   * Returns the farthest Point to the mainPoint
   * @param mainPoint point from which the distance will be measured
   * @param points collection of Points that will be tested
   * @param exclude point(s) that will be excluded
   */
  static farthestPoint(mainPoint: Vector3, points: Vector3[], exclude?: (Vector3 | Vector3[])): Vector3 {
    let farthest: Vector3 = mainPoint;
    let farthestDistance: number = 0;

    points.forEach(point => {
      if (mainPoint == point) return;
      if (exclude instanceof Vector3 && point == exclude) return;
      if (exclude instanceof Array && exclude.includes(point)) return;

      let distance = Formeln3.distance(mainPoint, point);

      if (!farthest || !farthestDistance || distance > farthestDistance) {
        farthest = point;
        farthestDistance = distance;
      }
    })

    return farthest;
  }

  /**
   * Moves @param distance in @param direction from the @param start Point and returns the new Position
   * @param start point from which the movement starts
   * @param movement angle in which the point will be moved
   */
  static moveDirection(start: Vector3, movement: Vector3): Vector3 {
    return new Vector3(
      start.x + movement.x,
      start.y + movement.y,
      start.z + movement.z
    );
  }

  /**
   * Rotates the @param point around a @param center Point by @param angle degrees
   * @param center point which another point will rotate around
   * @param point point that will be rotated
   * @param angel angle by which the point will be rotated
   */
  static rotateAroundCenter(center: Vector3, point: Vector3, angle: Vector3): Vector3 {
    let rotateX = Formeln2.rotateAroundCenter(new Vector2(center.x, center.y), new Vector2(point.x, point.y), angle.x);
    point = new Vector3 (
      rotateX.x,
      rotateX.y,
      point.z
    )
    let rotateY = Formeln2.rotateAroundCenter(new Vector2(center.y, center.z), new Vector2(point.y, point.z), angle.y);
    point = new Vector3 (
      point.x,
      rotateY.x,
      rotateY.y
    )
    let rotateZ = Formeln2.rotateAroundCenter(new Vector2(center.z, center.x), new Vector2(point.z, point.x), angle.z);
    point = new Vector3 (
      rotateZ.y,
      point.y,
      rotateZ.x
    )

    return point;
  }
}