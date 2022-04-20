import { SceneObject } from "../../assets/SceneObject.js";
import Vector3 from "../../util/Vector3.js";
import Polygon3 from "../boundingBox/Polygon3.js";
import Point from "../Point.js";
import { ICollideable3 } from "../propertys/ICollideable3.js";

export default class WorldObject3 extends SceneObject implements ICollideable3 {
  // ICollideable
  pos: Vector3;
  hitBox: Polygon3;

  constructor(center: Vector3, hitBox: Polygon3) {
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
  touches(obj: Vector3 | Polygon3): boolean {
    throw new Error("Method not implemented.");
  }
  translatePoints(): Vector3[] {
    let points = this.hitBox.translatePoints(this.pos);
    let vec: Vector3[] = new Array();
    points.forEach(p => {
      vec.push(p.vec);
    })
    return vec;
  }

  isOnScreen(): boolean {
    // return CircleCollision.potentialCollision(this, this.getCamara()) && SAT.testCollision(this, this.getCamara());
    return true;
  }

  calcPosOnScreen(): Vector3 {
    return new Vector3(
      this.pos.x - this.getCamara().offset.x,
      this.pos.y - this.getCamara().offset.y,
      this.pos.z
    )
  }

  rotate(degrees: Vector3) {
    this.hitBox.rotate(degrees);
  }

  // getFarthestPoint() {
  //   this.translatePoints();
  //   return Formeln.farthestPoint(this.pos, this.hitBox.points);
  // }
}