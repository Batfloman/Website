import { HitBox } from "../physic/boundingBox/HitBox.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";
export declare abstract class UIObject<HitBoxType extends HitBox> extends WorldObject<HitBoxType> {
    constructor(pos: Vector2, hitBox: HitBoxType, angle?: number);
    shouldRender(): boolean;
    abstract action(): void;
}
