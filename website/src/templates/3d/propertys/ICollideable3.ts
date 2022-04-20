import Vector3 from "../../util/Vector3";
import Polygon3 from "../boundingBox/Polygon3";

export interface ICollideable3 {
  pos: Vector3;
  hitBox: Polygon3;

  touches(obj: Polygon3 | Vector3): boolean;
  translatePoints(): Vector3[];
}