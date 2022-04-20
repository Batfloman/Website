import { SceneObject } from "../../assets/SceneObject.js";
import Polygon from "../boundingBox/Polygon2.js";
import Vector2 from "../../util/Vector2.js";
import Formeln from "../Formeln2.js";
import Color from "../../util/Color.js";
import { ICollideable } from "../propertys/ICollideable.js";
import SAT from "../collision/SAT.js";
import CircleCollision from "../collision/CircleCollision.js";

export default class WorldObject2 extends SceneObject implements ICollideable {
  // ICollideable
  pos: Vector2;
  hitBox: Polygon;

  constructor(center: Vector2, hitBox: Polygon) {
    super();

    this.pos = center;
    this.hitBox = hitBox;
  }

  // SceneObject
  update(dt: number): void {
    throw new Error("Method not implemented.");
  }
  render(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  shouldRender(): boolean {
    return this.isOnScreen();
  }

  // ICollideable
  touches(obj: Vector2 | Polygon): boolean {
    throw new Error("Method not implemented.");
  }
  translatePoints(): Vector2[] {
    return this.hitBox.translatePoints(this.pos);
  }

  isOnScreen(): boolean {
    return CircleCollision.potentialCollision(this, this.getCamara()) && SAT.testCollision(this, this.getCamara());
  }

  calcPosOnScreen(): Vector2 {
    return this.pos.subtract(this.getCamara().offset);
  }

  rotate(degree: number) {
    this.hitBox.rotate(degree);
  }

  getFarthestPoint() {
    this.translatePoints();
    return Formeln.farthestPoint(this.pos, this.hitBox.points);
  }
}