import Vector2 from "./Vector2.js";

export default class Util {
  static array = {
    getItem<T>(arr: T[], index: number): T {
      if (index < 0) index = arr.length - 1;

      return arr[index % arr.length];
    },

    getLastItem<T>(arr: T[]): T {
      return arr[arr.length - 1];
    },

    getRandomItem<T>(arr: T[]): T {
      return Util.array.getItem(arr, Util.math.randomBetween(0, arr.length - 1));
    },

    removeItemAtIndex<T>(arr: T[], index: number): T {
      if (index < 0 || index >= arr.length) throw new Error(`${index} is not Valid!`);

      return arr.splice(index, 1)[0];
    },

    removeItem<T>(arr: T[], item: T): T | null {
      if (arr.includes(item)) {
        return arr.splice(arr.indexOf(item), 1)[0];
      }
      return null;
    },
  };

  static math = {
    randomBetween(start: number, end: number, num_decimals: number = 0): number {
      return Util.math.round(Math.random() * (end - start) + start, num_decimals);
    },
    round(number: number, num_decimals: number = 0): number {
      return Math.round(number * Math.pow(10, num_decimals)) / Math.pow(10, num_decimals);
    },
    toRadian(degree: number) {
      return (degree * Math.PI) / 180;
    }
  }

  static shapes = {
    cricle: {
      area(radius: number): number {
        return Math.PI * Math.pow(radius, 2);
      },
    },
  };

  /**
   * Returns the Hypothenuse of a Triangle
   * @param side1 the lenght of the 1. side
   * @param side2 the lenght of the 2. side
   */
  static calcHypothenuse(side1: number, side2: number): number {
    return Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
  }

  /**
   * Returns the distance between to Points
   * @param point1
   * @param point2
   */
  static distance(point1: Vector2, point2: Vector2): number {
    return Util.calcHypothenuse(point1.x - point2.x, point1.y - point2.y);
  }

  /**
   * Returns the closest Point to the mainPoint
   * @param mainPoint point from which the distance will be measured
   * @param points collection of Points that will be tested
   * @param exclude point(s) that will be excluded
   */
  static closestPoint(
    mainPoint: Vector2,
    points: Vector2[],
    exclude?: Vector2 | Vector2[]
  ): Vector2 {
    let closest: Vector2 = new Vector2(Infinity, Infinity);
    let closestDistance: number = Infinity;
    points.forEach((point) => {
      if (mainPoint == point) return;
      if (exclude instanceof Vector2 && point == exclude) return;
      if (exclude instanceof Array && exclude.includes(point)) return;

      let distance = Util.distance(mainPoint, point);
      if (!closest || !closestDistance || distance < closestDistance) {
        closest = point;
        closestDistance = distance;
      }
    });
    return closest;
  }

  /**
   * Returns the farthest Point to the mainPoint
   * @param mainPoint point from which the distance will be measured
   * @param points collection of Points that will be tested
   * @param exclude point(s) that will be excluded
   */
  static farthestPoint(
    mainPoint: Vector2,
    points: Vector2[],
    exclude?: Vector2 | Vector2[]
  ): Vector2 {
    let farthest: Vector2 = mainPoint;
    let farthestDistance: number = 0;

    points.forEach((point) => {
      if (mainPoint == point) return;
      if (exclude instanceof Vector2 && point == exclude) return;
      if (exclude instanceof Array && exclude.includes(point)) return;

      let distance = Util.distance(mainPoint, point);

      if (distance >= farthestDistance) {
        farthest = point;
        farthestDistance = distance;
      }
    });

    return farthest;
  }

  /**
   * Moves @param distance in @param direction from the @param start Point and returns the new Position
   * @param start point from which the movement starts
   * @param direction angle in which the point will be moved
   * @param distance amount by which the point will be moved
   */
  static moveDirection(start: Vector2, direction: number, distance: number): Vector2 {
    const rad = Util.math.toRadian(direction);
    const moveX = Math.sin(rad) * distance;
    const moveY = Math.cos(rad) * distance;

    return new Vector2(start.x + moveX, start.y + moveY);
  }

  /**
   * Rotates the @param point around a @param center Point by @param angle degrees
   * @param center point which another point will rotate around
   * @param point point that will be rotated
   * @param angle angle by which the point will be rotated
   */
  static rotateAroundCenter(center: Vector2, point: Vector2, angle: number): Vector2 {
    const rad = Util.math.toRadian(angle);
    const xRotated =
      Math.cos(rad) * (point.x - center.x) - Math.sin(rad) * (point.y - center.y) + center.x;
    const yRotated =
      Math.sin(rad) * (point.x - center.x) + Math.cos(rad) * (point.y - center.y) + center.y;

    return new Vector2(xRotated, yRotated);
  }
}
