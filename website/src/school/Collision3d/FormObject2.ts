import WorldObject from "../../templates/3d/assets/WorldObject3.js";
import Polygon3 from "../../templates/3d/boundingBox/Polygon3.js";
import Formeln3 from "../../templates/3d/Formeln3.js";
import Color from "../../templates/util/Color.js";
import Vector3 from "../../templates/util/Vector3.js";

export default class FormObject2 extends WorldObject {
  render(ctx: CanvasRenderingContext2D): void {
    let points = this.hitBox.translatePoints(this.calcPosOnScreen())
    points.forEach(point => {
      ctx.beginPath();
      // let valueR = (point.vec.x / 5 - 50) % 255
      let valueR = 0;
      // let valueG = (point.vec.y / 5 + 150) % 255
      let valueG = 0;
      let valueB = (point.vec.z / 1.75 + 130) % 255
      let color = new Color(255-valueR, 255-valueB, 255-valueG).getRGBValue()
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.arc(point.vec.x + (point.vec.z/3), point.vec.y - (point.vec.z/3), 3, 0, 360);
      ctx.fill();
      ctx.stroke();

      point.connectedTo.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(point.vec.x + (point.vec.z/3), point.vec.y- (point.vec.z/3));
        ctx.lineTo(p.x + (p.z/3), p.y - (p.z/3));
        ctx.stroke();
      })
    });
  }

  update(dt: number): void {
    this.rotate(
      new Vector3(
        5 * dt / 1000, 
        0 * dt / 1000, 
        33 * dt / 1000
      )
    );
  }
}