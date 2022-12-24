import { Vector2 } from "../../util/Vector2.js";
import { Polygon2 } from "../geometry/Polygon2.js";
type PolygonWinding = "clockwise" | "counterclockwise";
export declare class Polygon2Helper {
    /**
     * Test a polygon for convexity
     */
    static testConvex(polygon: Polygon2): boolean;
    /**
     * test a vertex for Convexity
     */
    static isConvex(windung: PolygonWinding, crossProduct: number): boolean;
    /**
     * Returns the winding of an Polygon
     */
    static findWinding(polygon: Polygon2): PolygonWinding;
    static findArea(polygon: Polygon2): number;
    /**
     * Translates a point and returns the new Position
     */
    static translatePoint(point: Vector2, center: Vector2, angle?: number): Vector2;
    static translatePoints(points: Vector2[], center: Vector2, angle?: number): Vector2[];
}
export {};
