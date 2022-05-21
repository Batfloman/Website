import { HitBox } from "../../physic/boundingBox/HitBox.js";
import { WorldObject } from "./WorldObject.js";
export declare abstract class ControllableObject<HitBoxType extends HitBox> extends WorldObject<HitBoxType> {
    protected controlles: Map<inputKey, Function>;
    update(dt: number): void;
}
