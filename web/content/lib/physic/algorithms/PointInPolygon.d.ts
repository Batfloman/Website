import { Vector2 } from "../../util/Vector2.js";
import { ICollideable } from "../property/ICollideable.js";
export declare class PointInPolygon {
    static isPointInsidePolygon(point: Vector2, polygon: ICollideable | Vector2[]): boolean;
}
