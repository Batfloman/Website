import { SceneObject } from "../assets/objects/SceneObject.js";
import { Camara } from "../display/Camara.js";
import { Canvas } from "../display/Canvas.js";
import { Renderer } from "../display/Renderer.js";
import { World } from "../assets/worlds/World.js";
import { Color } from "../util/Color.js";
export declare class Game {
    protected canvas: Canvas;
    protected camara: Camara;
    protected renderer: Renderer;
    private isStopped;
    private stoppedBecauseBlur;
    private timeElapsedBeforeStop;
    constructor(canvas: Canvas);
    private registerClick;
    private static getRelativeTouchPos;
    private static gameLoop;
    tick(): void;
    private updateObjects;
    private renderObjects;
    addObject(obj: SceneObject, worldName?: string): void;
    removeObject(obj: SceneObject, worldName?: string): SceneObject | undefined;
    findObjects<T extends SceneObject>(clas: Function, exclude?: T | T[]): T[];
    protected worlds: Map<string, World>;
    setWorld(name: string, world: World): void;
    getWorld(name?: string): World | undefined;
    setWorldBackground(color: Color, name?: string): void;
    setWorldChunkSize(size: number, name?: string): void;
    private lastTickTime;
    private calc_dt;
    start(): void;
    stop(): void;
    getCamara(): Camara;
    getRenderer(): Renderer;
    getCanvas(): Canvas;
    setCamaraScaleLock(b: boolean): void;
    setCamaraMovementLock(b: boolean): void;
}