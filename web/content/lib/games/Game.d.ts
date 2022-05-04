import { SceneObject } from "../assets/SceneObject.js";
import Canvas from "../display/Canvas.js";
export declare abstract class Game {
    canvas: Canvas;
    objects: SceneObject[];
    paused: boolean;
    constructor(canvas: Canvas);
    addObject(obj: SceneObject): void;
    removeObject(obj: SceneObject): SceneObject | undefined;
    findObjects<T extends SceneObject>(clas: Function, exclude?: T | T[]): T[];
    tick(): void;
    lastTime: number;
    timeSinceLastTime: number;
    calc_dt(): number;
    start(): void;
    stop(): void;
    private static testTick;
}
