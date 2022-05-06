import Polygon2 from "../physic/boundingBox/Polygon2.js";
import Vector2 from "../util/Vector2.js";
import WorldObject from "./WorldObject.js";
export declare abstract class UIObject extends WorldObject {
    constructor(pos: Vector2, hitBox: Polygon2, angle?: number);
    shouldRender(): boolean;
    abstract action(): void;
}
