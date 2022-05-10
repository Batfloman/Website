import { HitBox } from "../physic/boundingBox/HitBox.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";
export declare abstract class ControllableObject<HitBoxType extends HitBox> extends WorldObject<HitBoxType> {
    controlles: Map<inputKey, Function>;
    constructor(pos: Vector2, hitBox: HitBoxType, angle?: number);
    update(dt: number): void;
}
