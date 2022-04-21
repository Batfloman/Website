import Formeln from "../2d/Formeln2.js";
import Input from "../input/Input.js";
import Polygon from "../2d/boundingBox/Polygon2.js";
import Rectangle from "../2d/boundingBox/Rectangle.js";
import { IMoveable } from "../2d/propertys/IMoveable.js";
import Vector2 from "../util/Vector2.js";
import Canvas from "./Canvas.js";
import Polygon2Helper from "../2d/collision/Polygon2Helper.js";
import WorldObject2 from "../2d/assets/WorldObject2.js";

export default class Camara implements IMoveable {
  canvas: Canvas;
  
  offset: Vector2;
  scale: number;
  
  // ICollideable
  pos: Vector2;
  hitBox: Polygon;
  angle: number = 0;
  points: Vector2[];
  
  // IMoveable
  lockMovement: boolean;
  
  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.pos = new Vector2();
    this.offset = new Vector2(canvas.htmlCanvas.width / -2, canvas.htmlCanvas.height / -2)
    this.hitBox = new Rectangle(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
    this.lockMovement = true;
    this.scale = 1;

    Input.newEventListener("mousemove", this, (event: MouseEvent) => {
      if(Input.pressedKeys.includes("0")) {
        let move = new Vector2(event.movementX, event.movementY);
        this.pos = this.pos.subtract(move);
        this.offset = this.offset.subtract(move);
      }
    })
    Input.newEventListener("resize", this, (event: Event) => {
      this.hitBox = new Rectangle(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
    })

    this.points = this.translatePoints();
  }

  calcPointPosOnScreen(point: Vector2): Vector2 {
    return point.subtract(this.offset);
  }

  calcPointsPosOnScreen(points: Vector2[]): Vector2[] {
    let p: Vector2[] = new Array();
    points.forEach(point => {
      p.push(point.subtract(this.offset))
    })
    return p;
  }

  getMousePosWithViewOffSet(without: Vector2): Vector2 {
    return without.add(this.offset);
  }

  // IMoveable
  translatePoints(): Vector2[] {
    return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.angle);
  }
  touches(obj: Vector2 | Polygon): boolean {
    throw new Error("Method not implemented.");
  }
  move(direction: number, distance: number): void {
    this.pos = Formeln.moveDirection(this.pos, direction, distance);
  }
}