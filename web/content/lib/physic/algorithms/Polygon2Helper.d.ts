import Vector2 from "../../util/Vector2.js";
import Polygon2 from "../boundingBox/Polygon2.js";
declare type PolygonWindung = "clockwise" | "counterclockwise";
export default class Polygon2Helper {
    static testConvex(polygon: Polygon2): boolean;
    static isConvex(windung: PolygonWindung, crossProduct: number): boolean;
    static findWindung(polygon: Polygon2): PolygonWindung;
    static findArea(polygon: Polygon2): number;
    static translatePoint(point: Vector2, center: Vector2, angle?: number): Vector2;
    static translatePoints(points: Vector2[], center: Vector2, angle?: number): Vector2[];
}
export {};
