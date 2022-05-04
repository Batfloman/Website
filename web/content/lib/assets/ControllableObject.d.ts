import Polygon2 from "../physic/boundingBox/Polygon2.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";
export declare abstract class ControllableObject extends WorldObject {
    controlles: Map<key, Function>;
    constructor(pos: Vector2, hitBox: Polygon2, angle?: number);
    update(dt: number): void;
}
