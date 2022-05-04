import Vector2 from "./Vector2.js";
export default class Util {
    static getItem<T>(arr: T[], index: number): T;
    static getRandomItem<T>(arr: T[]): T;
    static randomBetween(start: number, end: number, afterDot?: number): number;
    static calcHypothenuse(side1: number, side2: number): number;
    static distance(point1: Vector2, point2: Vector2): number;
    static closestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    static farthestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    static moveDirection(start: Vector2, direction: number, distance: number): Vector2;
    static rotateAroundCenter(center: Vector2, point: Vector2, angle: number): Vector2;
    static toRadian(degree: number): number;
}
