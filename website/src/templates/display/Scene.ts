import { SceneObject } from "../assets/SceneObject.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Rectangle from "../physic/2d/boundingBox/Rectangle.js";
import { ICollideable } from "../propertys/ICollideable.js";
import { IRenderable } from "../propertys/IRenderable.js";
import { IUpdateable } from "../propertys/IUpdateable.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
import Canvas from "./Canvas.js";

export default class Scene implements IRenderable, ICollideable, IUpdateable {
  canvas: Canvas;
  objects: SceneObject[];
  camara: Camara;
  
  pos: Vector2;
  hitBox: Polygon;

  constructor(canvas: Canvas, ...objects: SceneObject[]) {
    this.canvas = canvas;
    this.objects = objects;
    this.camara = new Camara(canvas);
    this.hitBox = new Rectangle(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
    this.pos = new Vector2(0, 0);
  }
  

  // ICollideable
  touches(obj: Vector2 | Polygon): boolean {
    throw new Error("Method not implemented.");
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
      if (obj instanceof SceneObject && obj.shouldRender()) {
        obj.render(ctx);
      }
    });
  }
  shouldRender(): boolean {
    return true;
  }
}