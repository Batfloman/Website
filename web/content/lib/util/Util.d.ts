import Polygon2 from "../physic/boundingBox/Polygon2.js";
import Vector2 from "./Vector2.js";
export default class Util {
    static array: {
        getItem<T>(arr: T[], index: number): T;
        getLastItem<T_1>(arr: T_1[]): T_1;
        getRandomItem<T_2>(arr: T_2[]): T_2;
        removeItemAtIndex<T_3>(arr: T_3[], index: number): T_3;
        removeItem<T_4>(arr: T_4[], item: T_4): T_4 | null;
    };
    static math: {
        randomBetween(start: number, end: number, num_decimals?: number): number;
        round(number: number, num_decimals?: number): number;
        floor(number: number, num_decimals?: number): number;
        toRadian(degree: number): number;
    };
    static shapes: {
        cricle: {
            area(radius: number): number;
        };
        polygon: {
            area(polygon: Polygon2): number;
        };
    };
    static calcHypothenuse(side1: number, side2: number): number;
    static distance(point1: Vector2, point2: Vector2): number;
    static closestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    static farthestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    static moveDirection(start: Vector2, direction: number, distance: number): Vector2;
    static rotateAroundCenter(center: Vector2, point: Vector2, angle: number): Vector2;
}
