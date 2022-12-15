import { Input } from "../input/Input.js";
import { Collision } from "../physic/algorithms/Collision.js";
import { Polygon2Helper } from "../physic/algorithms/Polygon2Helper.js";
import { Polygon2 } from "../physic/boundingBox/Polygon2.js";
import { Rectangle } from "../physic/boundingBox/Rectangle.js";
import { ICollideable } from "../physic/properties/ICollideable.js";
import { IMoveable } from "../physic/properties/IMoveable.js";
import { Util } from "../util/Util.js";
import { Vector2 } from "../util/Vector2.js";
import { Canvas } from "./Canvas";

export class Camara implements ICollideable, IMoveable {
  private canvas: Canvas;

  constructor(canvas: Canvas, pos?: Vector2) {
    this.canvas = canvas;
    this.pos = !pos ? new Vector2() : pos;

    this.hitBox = new Rectangle(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
    this.orientation = 0;
    this.translatePoints();

    // mouse
    Input.newEventListener("wheel", this, this.mouseWheel);
    Input.newEventListener("mousemove", this, this.mouseMove);
    // touch
    Input.newEventListener("touchmove", this, this.touchMove);
    Input.newEventListener("touchend", this, () => (this.previousTouchPos = undefined));
    Input.newEventListener("touchcancel", this, () => (this.previousTouchPos = undefined));
    // window
    Input.newEventListener("resize", this, () => {
      this.hitBox = new Rectangle(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
      this.alreadyTranslated = false;
    });
  }

  /** Returns the Vector from the top left corner to the center */
  getOffset(): Vector2 {
    return new Vector2(this.canvas.width / 2, this.canvas.height / 2);
  }

  // ==========================================================================================
  // #region collision & stuff

  hitBox: Polygon2;
  orientation: number;
  translatedPoints!: Vector2[];
  alreadyTranslated: boolean = false;

  moveDirection(direction: number, distance: number): void {
    this.pos = Util.moveDirection(this.pos, direction, distance);
  }

  move(move: Vector2): void {
    this.pos = this.pos.add(move);
  }

  isCollidingWith(other: ICollideable): boolean {
    return Collision.testCollision(this, other);
  }

  translatePoints(): Vector2[] {
    if (this.alreadyTranslated) return this.translatedPoints;

    this.translatedPoints = [];

    for (let point of this.hitBox.model) {
      point = point.scale(1 / this.scaleValue);
      this.translatedPoints.push(Polygon2Helper.translatePoint(point, this.pos, this.orientation));
    }

    this.hitBox.farthestDistance = this.getOffset()
      .scale(1 / this.scaleValue)
      .getMagnitude();

    this.alreadyTranslated = true;

    return this.translatedPoints;
  }

  //#endregion

  // ==========================================================================================
  // #region Scaling

  // active state
  private lockScaling: boolean = true;

  // "static" values
  private zoomFactor: number = 1.15;
  private maxZoomInAmount: number = Infinity;
  private maxZoomOutAmount: number = Infinity;

  // change during runtime
  private scaleAmount: number = 0;
  scaleValue: number = 1;

  private mouseWheel(event: WheelEvent): void {
    if (this.lockScaling) return;

    event.deltaY < 0 ? this.zoomIn() : this.zoomOut();
    this.updateScaleValue();

    this.alreadyTranslated = false;
  }

  private zoomIn(): void {
    if (this.scaleAmount >= this.maxZoomInAmount) return;

    this.scaleAmount++;
  }

  private zoomOut(): void {
    if (this.scaleAmount <= -this.maxZoomOutAmount) return;

    this.scaleAmount--;
  }

  private updateScaleValue(): void {
    this.scaleValue = Math.pow(this.zoomFactor, this.scaleAmount);
  }

  setScale(scale: number): void {
    this.scaleAmount = scale;
    this.updateScaleValue();
    this.alreadyTranslated = false;
  }
  setMaxZoomInAmount(amount: number) {
    this.maxZoomInAmount = amount;
  }
  setMaxZoomOutAmount(amount: number) {
    this.maxZoomOutAmount = amount;
  }
  setZoomingFactor(factor: number) {
    this.zoomFactor = factor;
    this.alreadyTranslated = false;
  }
  setLockScaling(b: boolean): void {
    this.lockScaling = b;
  }

  //#endregion

  // ==========================================================================================
  //#region Moving

  // active state
  private lockMovement: boolean = true;

  // change during runtime
  pos: Vector2;

  private mouseMove(event: MouseEvent): void {
    if (this.lockMovement) return;

    if (!Input.isLeftClick()) return;

    this.pos.x -= event.movementX / this.scaleValue;
    this.pos.y += event.movementY / this.scaleValue;

    this.alreadyTranslated = false;
  }

  setLockMovement(b: boolean): void {
    this.lockMovement = b;
  }

  private previousTouchPos: Vector2 | undefined;
  private touchMove(event: TouchEvent): void {
    if (this.lockMovement) return;

    const touch = event.touches[0] || event.changedTouches[0];
    const touchPos = new Vector2(touch.clientX, touch.clientY);

    if (!this.previousTouchPos) {
      this.previousTouchPos = touchPos;
      return;
    }

    const move = touchPos.subtract(this.previousTouchPos);
    this.previousTouchPos = touchPos;

    this.pos.x -= move.x / this.scaleValue;
    this.pos.y += move.y / this.scaleValue;

    this.alreadyTranslated = false;
  }

  //#endregion
}
