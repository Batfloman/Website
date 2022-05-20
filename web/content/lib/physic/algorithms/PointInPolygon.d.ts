import { WorldObject } from "../../assets/WorldObject";
import Vector2 from "../../util/Vector2";
import Polygon2 from "../boundingBox/Polygon2";
export default class PointInPolygon {
    isPointInPolygon(p: Vector2, obj: WorldObject<Polygon2>): boolean;
}
