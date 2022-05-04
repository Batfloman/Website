import { SceneObject } from "../assets/SceneObject.js";
import Canvas from "../display/Canvas.js";
import Input from "../input/Input.js";

export abstract class Game {
  canvas: Canvas;
  objects: SceneObject[];

  paused: boolean = true;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.objects = [];

    setInterval(Game.testTick, 10, this);

    Input.newEventListener("blur", this, () => {
      this.stop();
    });
    Input.newEventListener("focus", this, () => {
      this.start();
    })
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
      if(exclude instanceof Array && exclude.includes(obj as T)) return;
      if(exclude instanceof Object && exclude == obj) return;
      if (obj instanceof clas) {
        found.push(obj as T);
      }
    });

    return found;
  }

  tick(): void {
    throw new Error("not Implmented!");
  }

  lastTime = Date.now();
  timeSinceLastTime = 0;
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
