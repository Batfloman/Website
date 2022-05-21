import { SceneObject } from "../Objects/SceneObject.js";
import Camara from "../../display/Camara.js";
import Canvas from "../../display/Canvas.js";
import Renderer from "../../display/Renderer.js";
import Input from "../../input/Input.js";
import World from "../Worlds/World.js";

export abstract class Game {
  // display
  protected canvas: Canvas;
  protected camara: Camara;
  protected renderer: Renderer;

  // contents
  protected worlds: Map<string, World> = new Map();

  // time
  private isStopped: boolean = true;
  private stoppedBecauseBlur: boolean = false;
  private timeElapsedBeforeStop = 0;
  private lastTickTime = Date.now();

  maxUpdateDistance = 2000;
  deleteDistance = 10000;

  constructor(canvas: Canvas) {
    this.canvas = canvas;

    this.camara = new Camara(this.canvas);
    this.renderer = new Renderer(this.canvas, this.camara);

    this.addWorld("main", new World());

    Input.newEventListener("blur", this, () => {
      if (!this.isStopped) {
        this.stop();
        this.stoppedBecauseBlur = true;
      }
    });
    Input.newEventListener("focus", this, () => {
      if (this.stoppedBecauseBlur) this.start();
    });
    Input.newEventListener("resize", this, this.renderObjects);

    // start loop
    Game.testTick(this);
  }

  // ==========================================================================================
  // game Tick

  // only tick's game when running
  private static testTick(game: Game): void {
    if (!game.isStopped) game.tick();

    window.requestAnimationFrame(() => {
      Game.testTick(game);
    });
  }

  tick(): void {
    let before = Date.now();
    this.updateObjects();
    const timeToUpdate = Date.now() - before;

    before = Date.now();
    this.renderObjects();
    const timeToRender = Date.now() - before;

    console.log("update", timeToUpdate, "render", timeToRender);
  }

  private updateObjects() {
    let dt = this.calc_dt();
    this.lastTickTime = Date.now();

    for(let world of Array.from(this.worlds.values())) {
      for(let obj of world.objects) {
        if(obj.shouldUpdate()) obj.update(dt);
      }
    }
  }

  private renderObjects() {
    this.renderer.clear();
    
    for(let world of Array.from(this.worlds.values())) {
      world.objects.sort((a, b) => (a.zIndex <= b.zIndex ? -1 : 1));

      for(let obj of world.objects) {
        if(obj.shouldRender()) obj.render(this.renderer);
      }
    }
  }

  // ==========================================================================================
  // objects

  addObject(obj: SceneObject, worldName: string = "main"): void {
    const world = this.worlds.get(worldName);
    if(!world) throw new Error(`${worldName} is no World!`);

    world.addObject(obj);
    obj.init(this, this.canvas);
  }

  removeObject(obj: SceneObject, worldName: string = "main"): SceneObject | undefined {
    const world = this.worlds.get(worldName);
    if(!world) throw new Error(`${worldName} is no World`);

    return world.removeObject(obj);
  }

  findObjects<T extends SceneObject>(clas: Function, exclude?: T | T[]): T[] {
    let found: T[] = [];

    for(let world of Array.from(this.worlds.values())) {
      for(let obj of world.objects) {
        if(exclude instanceof Array && exclude.includes(obj as T)) continue;
        if(exclude instanceof Object && exclude == obj) continue;

        if(obj instanceof clas) found.push(obj as T);
      }
    }

    return found;
  }

  // ==========================================================================================
  // worlds

  addWorld(name: string, world: World) {
    this.worlds.set(name, world);
  }

  getWorld(name: string): World | undefined {
    return this.worlds.get(name);
  }

  // ==========================================================================================
  // time

  private calc_dt(): number {
    return Date.now() - this.lastTickTime;
  }
  start(): void {
    if (!this.isStopped) return;

    this.lastTickTime = Date.now() - this.timeElapsedBeforeStop;
    this.isStopped = false;
  }
  stop(): void {
    if (this.isStopped) return;

    this.timeElapsedBeforeStop = Date.now() - this.lastTickTime;
    this.isStopped = true;
  }

  // ==========================================================================================
  // getter & setter

  getCamara(): Camara {
    return this.camara;
  }
  getRenderer(): Renderer {
    return this.renderer;
  }
  getCanvas(): Canvas {
    return this.canvas;
  }
  setCamaraScaleLock(b: boolean) {
    this.camara.lockScaling = b;
  }
  setCamaraMovementLock(b: boolean) {
    this.camara.lockMovement = b;
  }
  setMaxUpdateDistance(distance: number) {
    this.maxUpdateDistance = distance;
  }
  setMaxDeleteDistance(distance: number) {
    this.deleteDistance = distance;
  }
}
