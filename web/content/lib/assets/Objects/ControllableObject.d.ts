import { HitBox } from "../../physic/boundingBox/HitBox.js";
import { WorldObject } from "./WorldObject.js";
export declare abstract class ControllableObject<HitBoxType extends HitBox> extends WorldObject<HitBoxType> {
    private controlles;
    private timeOuts;
    update(dt: number): void;
    addControll(key: inputKey, func: Function, timeout?: number): void;
}
