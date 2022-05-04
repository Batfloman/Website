import Vector2 from "../../util/Vector2.js";
import Polygon2 from "../boundingBox/Polygon2.js";
export default class Triangulation {
    static triangulate(vertices: Vector2[]): Polygon2[];
    static isPointInTriangle(p: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean;
}
