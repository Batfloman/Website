import { SceneObject } from "../assets/SceneObject.js";
import Polygon from "../2d/boundingBox/Polygon2.js";
import Rectangle from "../2d/boundingBox/Rectangle.js";
import { ICollideable } from "../2d/propertys/ICollideable.js";
import { IRenderable } from "../2d/propertys/IRenderable.js";
import { IUpdateable } from "../2d/propertys/IUpdateable.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
import Canvas from "./Canvas.js";
import Polygon2Helper from "../2d/collision/Polygon2Helper.js";

export default class Scene implements IRenderable, ICollideable, IUpdateable {
  canvas: Canvas;
  objects: SceneObject[];
  camara: Camara;

  pos: Vector2;
  hitBox: Polygon;
  points: Vector2[];
  angle: number;

  constructor(canvas: Canvas, ...objects: SceneObject[]) {
    this.canvas = canvas;
    this.objects = objects;
    this.camara = new Camara(canvas);
    this.hitBox = new Rectangle(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
    this.pos = new Vector2(0, 0);
    this.angle = 0;
    this.points = this.translatePoints();
  }

  addObject(obj: SceneObject): void {
    if (this.objects.includes(obj)) return;
    this.objects.push(obj);
  }

  removeObject(obj: SceneObject): SceneObject | null {
    if (!this.objects.includes(obj)) return null;
    return this.objects.splice(this.objects.indexOf(obj), 1)[0];
  }

  findObjects(clas: Function, exclude?: Array<SceneObject> | SceneObject): SceneObject[] {
    let found = new Array();

    this.objects.forEach(obj => {
      if (exclude instanceof Array && exclude.includes(obj)) return;
      if (exclude instanceof SceneObject && exclude == obj) return;

      if (obj instanceof clas) {
        found.push(obj);
      }
    })
    return found;
  }

  // ICollideable
  touches(obj: Vector2 | Polygon): boolean {
    throw new Error("Method not implemented.");
  }
  translatePoints(): Vector2[] {
    return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.angle);
  }

  // IUpdateable
  update(dt: number): void {
    this.objects.forEach(obj => {
      obj.update(dt);
    })
  }

  // IRenderable
  render(ctx: CanvasRenderingContext2D): void {
    this.objects.sort((a, b) => {
      return (a.zIndex > b.zIndex) ? 1 : -1
    });
    this.objects.forEach(obj => {
      if (obj.shouldRender()) {
        obj.render(ctx);
      }
    });
  }
  shouldRender(): boolean {
    return true;
  }
}