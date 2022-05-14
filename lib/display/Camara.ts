import Input from "../input/Input.js";
import Collision from "../physic/algorithms/Collision.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import SAT from "../physic/algorithms/SAT.js";
import Polygon2 from "../physic/boundingBox/Polygon2.js";
import Rectangel from "../physic/boundingBox/Rectangel.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
import Canvas from "./Canvas";

export default class Camara implements ICollideable, IMoveable {
  canvas: Canvas;

  pos: Vector2;
  scale: number = 1;

  hitBox: Polygon2;
  orientation: number;
  translatedPoints!: Vector2[];
  alreadyTranslated: boolean = false;

  lockScaling: boolean = true;
  lockMovement: boolean = true;

  constructor(canvas: Canvas, pos?: Vector2) {
    this.canvas = canvas;
    this.pos = !pos ? new Vector2() : pos;

    this.hitBox = new Rectangel(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
    this.orientation = 0;
    this.translatePoints();

    Input.newEventListener("wheel", this, (event: WheelEvent) => {
      if (this.lockScaling) return;
      if (!(event.target == this.canvas.htmlCanvas)) return;

      if (event.deltaY < 0) this.scale *= 1.15;
      else if (event.deltaY > 0) this.scale *= 1 / 1.15;

      this.alreadyTranslated = false;
    });
    Input.newEventListener("mousemove", this, (event: MouseEvent) => {
      if (this.lockMovement) return;
      if (!(event.target == this.canvas.htmlCanvas)) return;

      if (Input.isLeftClick()) {
        this.pos.x -= event.movementX / this.scale;
        this.pos.y += event.movementY / this.scale;
        this.alreadyTranslated = false;
      }
    });
    Input.newEventListener("resize", this, () => {
      this.hitBox = new Rectangel(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
      this.alreadyTranslated = false;
    });
  }
  moveDirection(direction: number, distance: number): void {
    this.pos = Util.moveDirection(this.pos, direction, distance);
  }
  move(move: Vector2): void {
    this.pos = this.pos.add(move);
  }
  checkCollision(other: ICollideable): boolean {
    return Collision.testCollision(this, other);
  }
  translatePoints(): Vector2[] {
    if (!this.alreadyTranslated) {
      this.translatedPoints = [];
      this.hitBox.model.forEach((point) => {
        this.translatedPoints.push(
          Polygon2Helper.translatePoint(point.scale(1 / this.scale), this.pos, this.orientation)
        );
      });
      this.hitBox.farthestPoint = Util.farthestPoint(new Vector2(), this.hitBox.model).scale(
        1 / this.scale
      );
      this.alreadyTranslated = true;
    }
    return this.translatedPoints;
  }

  /**
   * Returns the Vector from the top left corner to the center
   */
  getOffset(): Vector2 {
    return new Vector2(this.canvas.width / 2, this.canvas.height / 2);
  }
}
