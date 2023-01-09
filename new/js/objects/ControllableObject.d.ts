import { GameObject } from "./GameObject.js";
export declare abstract class ControllableObject extends GameObject {
    private controlles;
    private keyTimeOuts;
    update(dt: number): void;
    abstract update2(dt: number): void;
    addControll(key: inputKey, func: Function, timeout?: number): void;
}
