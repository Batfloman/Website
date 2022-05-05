import Vector2 from "../../util/Vector2.js";
import Polygon from "../boundingBox/Polygon2.js";
import IPositionable from "./IPositionable.js";
export default interface ICollideable extends IPositionable {
    hitBox: Polygon;
    points: Vector2[];
    orientation: number;
    checkCollision(other: ICollideable): boolean;
    translatePoints(): Vector2[];
}
