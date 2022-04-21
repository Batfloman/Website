import Polygon from "../boundingBox/Polygon2";
import Vector2 from "../../util/Vector2";
import { IMoveable } from "./IMoveable";

export interface ICollideable {
  pos: Vector2;
  hitBox: Polygon;
  points: Vector2[];
  angle: number;

  touches(obj: Polygon | Vector2): boolean;
  translatePoints(): Vector2[];
}