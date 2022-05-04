import Vector2 from "../../util/Vector2.js";
import Polygon2 from "../boundingBox/Polygon2.js";
export default class Polygon2Helper {
    static isConvex(polygon: Polygon2): boolean;
    static translatePoint(point: Vector2, center: Vector2, angle?: number): Vector2;
    static translatePoints(points: Vector2[], center: Vector2, angle?: number): Vector2[];
}
