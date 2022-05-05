import { SceneObject } from "../assets/SceneObject.js";
import Camara from "../display/Camara.js";
import Canvas from "../display/Canvas.js";
import Renderer from "../display/Renderer.js";
import Input from "../input/Input.js";

export abstract class Game {
  protected canvas: Canvas;
  protected objects: SceneObject[];
  protected camara: Camara;

  private paused: boolean = true;
  private pausedBecauseBlur: boolean = false;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.objects = [];

    this.camara = new Camara(this.canvas);

    setInterval(Game.testTick, 10, this);

    Input.newEventListener("blur", this, () => {
      if (!this.paused) {
        this.stop();
        this.pausedBecauseBlur = true;
      }
    });
    Input.newEventListener("focus", this, () => {
      if (this.pausedBecauseBlur) this.start();
    });
    Input.newEventListener("resize", this, this.renderObjects);
  }

  tick(): void {
    this.updateObjects();
    this.renderObjects();
  }

  private updateObjects() {
    let dt = this.calc_dt();
    this.objects.forEach((obj) => {
      obj.update(dt);
    });
  }

  private renderObjects() {
    let renderer = new Renderer(this.canvas, this.camara);

    renderer.clear();

    this.objects.sort((a, b) => a.zIndex <= b.zIndex ? -1 : 1);

    this.objects.forEach((obj) => {
      obj.render(renderer);
    });
  }

  addObject(obj: SceneObject): void {
    if (this.objects.includes(obj)) return;

    this.objects.push(obj);
    obj.init(this, this.canvas);
  }

  removeObject(obj: SceneObject): SceneObject | undefined {
    if (!this.objects.includes(obj)) return;

    let removed = this.objects.splice(this.objects.indexOf(obj), 1);
    return removed[0];
  }

  findObjects<T extends SceneObject>(clas: Function, exclude?: T | T[]): T[] {
    let found: T[] = [];

    this.objects.forEach((obj) => {
      if (exclude instanceof Array && exclude.includes(obj as T)) return;
      if (exclude instanceof Object && exclude == obj) return;
      if (obj instanceof clas) {
        found.push(obj as T);
      }
    });

    return found;
  }

  setCamaraScaleLock(b: boolean) {
    this.camara.lockScaling = b;
  }
  setCamaraMovementLock(b: boolean) {
    this.camara.lockMovement = b;
  }

  private lastTime = Date.now();
  private timeSinceLastTime = 0;
  calc_dt(): number {
    return Date.now() - this.lastTime;
  }
  start(): void {
    if (this.paused) {
      this.lastTime = Date.now() - this.timeSinceLastTime;
      this.paused = false;
    }
  }
  stop(): void {
    if (!this.paused) {
      this.timeSinceLastTime = Date.now() - this.lastTime;
      this.paused = true;
    }
  }
  private static testTick(game: Game): void {
    if (!game.paused) {
      game.tick();
      game.lastTime = Date.now();
    }
  }
}
