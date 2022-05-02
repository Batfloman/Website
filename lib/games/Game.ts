import { SceneObject } from "../assets/SceneObject.js";
import Canvas from "../display/Canvas.js";

export default class Game {
  canvas: Canvas;
  objects!: SceneObject[];

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  addObject(obj: SceneObject): void {
    if(this.objects.includes(obj)) return;

    this.objects.push(obj);
    obj.init(this, this.canvas);
  }

  removeObject(obj: SceneObject): SceneObject | undefined {
    if(!this.objects.includes(obj)) return;

    let removed = this.objects.splice(this.objects.indexOf(obj), 1);
    return removed[0];
  }

  findObjects<T extends SceneObject>(clas: T, exclude?: T): T[] {
    let found: T[] = [];

    
    return found;
  }
}