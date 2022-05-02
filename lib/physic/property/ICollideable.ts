import Vector2 from "../../util/Vector2";
import Polygon from "../boundingBox/Polygon";
import IPositionable from "./IPositionable";

export default interface ICollideable extends IPositionable {
  hitBox: Polygon;
  points: Vector2[];

  checkCollision(other: ICollideable): boolean;
  translatePoints(): Vector2[];
}