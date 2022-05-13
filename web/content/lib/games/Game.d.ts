import { SceneObject } from "../assets/SceneObject.js";
import Camara from "../display/Camara.js";
import Canvas from "../display/Canvas.js";
import Renderer from "../display/Renderer.js";
export declare abstract class Game {
    protected canvas: Canvas;
    protected objects: SceneObject[];
    protected camara: Camara;
    protected renderer: Renderer;
    private paused;
    private pausedBecauseBlur;
    private timeElapsedBeforePause;
    private lastTime;
    maxUpdateDistance: number;
    deleteDistance: number;
    constructor(canvas: Canvas);
    private static testTick;
    tick(): void;
    private updateObjects;
    private renderObjects;
    addObject(obj: SceneObject): void;
    removeObject(obj: SceneObject): SceneObject | undefined;
    findObjects<T extends SceneObject>(clas: Function, exclude?: T | T[]): T[];
    private calc_dt;
    start(): void;
    stop(): void;
    getCamara(): Camara;
    setCamaraScaleLock(b: boolean): void;
    setCamaraMovementLock(b: boolean): void;
    setMaxUpdateDistance(distance: number): void;
}
