import { SceneObject } from "./SceneObject.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Vector2 from "../util/Vector2.js";
import Formeln from "../Formeln.js";
import Color from "../util/Color.js";
import { ICollideable } from "../propertys/ICollideable.js";
import SAT from "../physic/2d/collision/SAT.js";
import CircleCollision from "../physic/2d/collision/CircleCollision.js";

export default class WorldObject extends SceneObject implements ICollideable {
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