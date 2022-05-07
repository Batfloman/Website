import Vector2 from "../../util/Vector2.js";
import ICollideable from "../property/ICollideable.js";
export default class Triangulation {
    static triangulate(obj: ICollideable): ICollideable[];
    static isPointInTriangle(p: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean;
}
