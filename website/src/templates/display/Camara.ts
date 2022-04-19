import Formeln from "../Formeln.js";
import Input from "../input/Input.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Rectangle from "../physic/2d/boundingBox/Rectangle.js";
import { IMoveable } from "../propertys/IMoveable.js";
import Vector2 from "../util/Vector2.js";
import Canvas from "./Canvas.js";

export default class Camara implements IMoveable {
  canvas: Canvas;
  
  pos: Vector2;
  offset: Vector2;
  hitBox: Polygon;
  scale: number;
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
  }

  getMousePosWithViewOffSet(without: Vector2): Vector2 {
    return without.add(this.offset);
  }

  // IMoveable
  translatePoints(): Vector2[] {
    return this.hitBox.translatePoints(this.pos);
  }
  touches(obj: Vector2 | Polygon): boolean {
    throw new Error("Method not implemented.");
  }
  move(direction: number, distance: number): void {
    this.pos = Formeln.moveDirection(this.pos, direction, distance);
  }
}