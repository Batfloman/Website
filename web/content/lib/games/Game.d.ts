import { SceneObject } from "../assets/SceneObject.js";
import Camara from "../display/Camara.js";
import Canvas from "../display/Canvas.js";
export declare abstract class Game {
    protected canvas: Canvas;
    protected objects: SceneObject[];
    protected camara: Camara;
    private paused;
    private pausedBecauseBlur;
    maxRenderDistance: number;
    constructor(canvas: Canvas);
    tick(): void;
    private updateObjects;
    private renderObjects;
    addObject(obj: SceneObject): void;
    removeObject(obj: SceneObject): SceneObject | undefined;
    findObjects<T extends SceneObject>(clas: Function, exclude?: T | T[]): T[];
    private lastTime;
    private timeElapsedBeforePause;
    calc_dt(): number;
    start(): void;
    stop(): void;
    private static testTick;
    getCamara(): Camara;
    setCamaraScaleLock(b: boolean): void;
    setCamaraMovementLock(b: boolean): void;
    setMaxRenderDistance(distance: number): void;
}
