import Vector2 from "../../util/Vector2.js";
import { HitBox } from "../boundingBox/HitBox.js";
import IPositionable from "./IPositionable.js";

export default interface ICollideable extends IPositionable {
  hitBox: HitBox;
  orientation: number;
  translatedPoints: Vector2[];

  checkCollision(other: ICollideable): boolean;
  translatePoints(): Vector2[];
}