import { SceneObject } from "../assets/objects/SceneObject.js";
import { Camara } from "../display/Camara.js";
import { Canvas } from "../display/Canvas.js";
import { Renderer } from "../display/Renderer.js";
import { Input } from "../input/Input.js";
import { World } from "../assets/worlds/World.js";
import { Util } from "../util/Util.js";
import { Color } from "../util/Color.js";
import { Thread } from "../multiThreading/Thread.js";

export class Game {
  // display
  protected canvas: Canvas;
  protected camara: Camara;
  protected renderer: Renderer;

  // contents

  // time
  private isStopped: boolean = true;
  private stoppedBecauseBlur: boolean = false;
  private timeElapsedBeforeStop = 0;

  maxUpdateDistance = Infinity;
  deleteDistance = Infinity;

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
    Game.gameLoop(this);
  }

  // ==========================================================================================
  //#region game Tick

  private static gameLoop(game: Game): void {
    game.tick();

    window.requestAnimationFrame(() => {
      Game.gameLoop(game);
    });
  }

  tick(): void {
    this.updateObjects();

    this.renderObjects();
  }

  private async updateObjects() {
    let dt = this.calc_dt();
    this.lastTickTime = Date.now();

    if (this.isStopped) dt = 0;

    const worlds = Array.from(this.worlds.values());

    for (let world of Util.array.copyOf(worlds)) {
      world.putObjectsInCunks();

      for (let obj of world.objects) {
        if (obj.shouldUpdate()) obj.update(dt);
      }
    }
  }

  private async renderObjects() {
    this.renderer.clear();

    const worlds = Array.from(this.worlds.values());

    for (let world of worlds) {
      world.objects.sort((a, b) => (a.zIndex <= b.zIndex ? -1 : 1));
      world.render(this.renderer);
    }

    for (let world of worlds) {
      for (let obj of world.objects) {
        if (obj.shouldRender()) obj.render(this.renderer);
      }
    }
  }

  //#endregion

  // ==========================================================================================
  // #region objects

  addObject(obj: SceneObject, worldName: string = "main"): void {
    const world = this.worlds.get(worldName);
    if (!world) throw new Error(`${worldName} is no World!`);

    world.addObject(obj);
    obj.init(this, this.canvas);
  }

  removeObject(obj: SceneObject, worldName: string = "main"): SceneObject | undefined {
    const world = this.worlds.get(worldName);
    if (!world) throw new Error(`${worldName} is no World`);

    return world.removeObject(obj);
  }

  findObjects<T extends SceneObject>(clas: Function, exclude?: T | T[]): T[] {
    let found: T[] = [];

    const worlds = Array.from(this.worlds.values());
    for (let world of worlds) {
      found = found.concat(world.findObjects(clas.name, exclude));
    }

    return Util.array.copyOf(found);
  }

  // #endregion

  // ==========================================================================================
  // #region worlds

  protected worlds: Map<string, World> = new Map();

  addWorld(name: string, world: World) {
    this.worlds.set(name, world);
  }

  getWorld(name: string = "main"): World | undefined {
    return this.worlds.get(name);
  }

  setWorldBackground(color: Color, name: string = "main"): void {
    const map = this.worlds.get(name);
    if (map) map.setBackground(color);
  }

  setWorldChunkSize(size: number, name: string = "main"): void {
    const map = this.worlds.get(name);
    if (map) map.setChunkSize(size);
  }

  //#endregion

  // ==========================================================================================
  // #region time

  private lastTickTime = Date.now();

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

  //#endregion

  // ==========================================================================================
  // #region getter & setter

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
    this.camara.setLockScaling(b);
  }
  setCamaraMovementLock(b: boolean) {
    this.camara.setLockMovement(b);
  }
  setMaxUpdateDistance(distance: number) {
    this.maxUpdateDistance = distance;
  }
  setMaxDeleteDistance(distance: number) {
    this.deleteDistance = distance;
  }

  //#endregion
}
