import { SceneObject } from "../assets/SceneObject.js";
import Camara from "../display/Camara.js";
import Canvas from "../display/Canvas.js";
import Renderer from "../display/Renderer.js";
import World from "../Worlds/World.js";
export declare abstract class Game {
    protected canvas: Canvas;
    protected camara: Camara;
    protected renderer: Renderer;
    protected worlds: Map<string, World>;
    private isStopped;
    private stoppedBecauseBlur;
    private timeElapsedBeforeStop;
    private lastTickTime;
    maxUpdateDistance: number;
    deleteDistance: number;
    constructor(canvas: Canvas);
    private static testTick;
    tick(): void;
    private updateObjects;
    private renderObjects;
    addObject(obj: SceneObject, worldName?: string): void;
    removeObject(obj: SceneObject, worldName?: string): SceneObject | undefined;
    findObjects<T extends SceneObject>(clas: Function, exclude?: T | T[]): T[];
    addWorld(name: string, world: World): void;
    getWorld(name: string): World | undefined;
    private calc_dt;
    start(): void;
    stop(): void;
    getCamara(): Camara;
    getRenderer(): Renderer;
    getCanvas(): Canvas;
    setCamaraScaleLock(b: boolean): void;
    setCamaraMovementLock(b: boolean): void;
    setMaxUpdateDistance(distance: number): void;
    setMaxDeleteDistance(distance: number): void;
}
