import Vector2 from "../util/Vector2.js";
export default class Input {
    static eventListener: Map<string, Listener[]>;
    static pressedKeys: string[];
    static mPosHover: Vector2;
    static staticConstructor(): void;
    static newEventListener<K extends keyof WindowEventMap>(event: K, obj: Object, func: Function): void;
    private static notifyOfEvent;
    private static keyDown;
    private static keyUp;
    static isLeftClick(): boolean;
    static isPressed(key: string): boolean;
}
declare class Listener {
    obj: Object;
    func: Function;
    constructor(obj: Object, func: Function);
}
export {};
