import Vector2 from "../../util/Vector2.js";
import ICollideable from "../property/ICollideable.js";
export default class PointToPolygon {
    static isPointInsidePolygon(point: Vector2, polygon: ICollideable | Vector2[]): void;
}
