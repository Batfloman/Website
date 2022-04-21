import { SceneObject } from "../../assets/SceneObject.js";
import Polygon from "../boundingBox/Polygon2.js";
import Vector2 from "../../util/Vector2.js";
import Formeln from "../Formeln2.js";
import Color from "../../util/Color.js";
import { ICollideable } from "../propertys/ICollideable.js";
import SAT from "../collision/SAT.js";
import CircleCollision from "../collision/CircleCollision.js";
import Polygon2 from "../boundingBox/Polygon2.js";
import Polygon2Helper from "../collision/Polygon2Helper.js";

export default class WorldObject2 extends SceneObject implements ICollideable {
  // ICollideable
  pos: Vector2;
  hitBox: Polygon;
  angle: number;
  points: Vector2[];

  constructor(center: Vector2, hitBox: Polygon, startAngle?: number) {
    super();

    this.pos = center;
    this.hitBox = hitBox;
    this.angle = !startAngle ? 0 : startAngle;
    this.points = this.translatePoints();
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
    this.points = Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.angle);
    return this.points;
  }

  isOnScreen(): boolean {
    return CircleCollision.potentialCollision(this, this.getCamara()) && SAT.testCollision(this, this.getCamara());
  }

  calcPosOnScreen(): Vector2 {
    return this.getCamara().calcPointPosOnScreen(this.pos);
  }

  calcPointsOnScreen(): Vector2[] {
    return this.getCamara().calcPointsPosOnScreen(this.translatePoints());
  }

  rotate(degree: number) {
    this.angle = (this.angle + degree) % 360;
  }

  getFarthestPoint(): Vector2 {
    let point = Formeln.farthestPoint(new Vector2(), this.hitBox.model);
    return Polygon2Helper.translatePoint(point, this.pos, this.angle);
  }
}