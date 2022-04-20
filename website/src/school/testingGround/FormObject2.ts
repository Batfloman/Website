import WorldObject from "../../templates/3d/assets/WorldObject3.js";
import Polygon3 from "../../templates/3d/boundingBox/Polygon3.js";
import Formeln3 from "../../templates/3d/Formeln3.js";
import Vector3 from "../../templates/util/Vector3.js";

export default class FormObject2 extends WorldObject {
  render(ctx: CanvasRenderingContext2D): void {
    let points = this.hitBox.translatePoints(this.calcPosOnScreen())
    points.forEach(point => {
      point.connectedTo.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(point.vec.x - (point.vec.z/2), point.vec.y- (point.vec.z/2));
        ctx.lineTo(p.x - (p.z/2), p.y - (p.z/2));
        ctx.stroke();

      })
    });
  }

  update(dt: number): void {
    this.rotate(
      new Vector3(
        0 * dt / 1000, 
        0 * dt / 1000, 
        66 * dt / 1000
      )
    );
  }
}