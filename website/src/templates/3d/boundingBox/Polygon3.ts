import Vector3 from "../../util/Vector3.js";
import Form from "../../../school/Collision2d/Form.js";
import Formeln3 from "../Formeln3.js";
import Point from "../Point.js";

export default class Polygon3 {
  model: Point[];

  angle: Vector3;

  constructor(model: Point[], startAngle?: Vector3) {
    this.model = model;
    this.angle = !startAngle ? new Vector3() : startAngle;
  }

  translatePoints(pos: Vector3): Point[] {
    let points: Point[] = new Array();
    // move to offset

    this.model.forEach(point => {
      let newPos = Polygon3.translatePoint(point.vec, pos, this.angle)
      let connected: Vector3[] = new Array();
      point.connectedTo.forEach(p => {
        connected.push(Polygon3.translatePoint(p, pos, this.angle))
      })
      points.push(new Point(newPos, connected))
    })

    return points;
  }

  centerModel(): void {
    let centerX = 0;
    let centerY = 0;
    let centerZ = 0;
    // adds all cordinates together
    this.model.forEach(point => {
      centerX += point.vec.x;
      centerY += point.vec.y;
      centerZ += point.vec.z;
    })
    // get the "durchschnitt"
    let moveX = centerX / this.model.length;
    let moveY = centerY / this.model.length;
    let moveZ = centerZ / this.model.length;
    // offsets the model Points by the offset from the centerpoint to the "real" centerpoint
    // => makes the centerpoint the real centerpoint
    this.model.forEach(point => {
      point.vec.x -= Math.round(moveX * 100) / 100;
      point.vec.y -= Math.round(moveY * 100) / 100;
      point.vec.z -= Math.round(moveZ * 100) / 100;
    })
  }

  rotate(degrees: Vector3) {
    this.angle = this.angle.add(degrees);
  }

  static translatePoint(point: Vector3, pos: Vector3, angle: Vector3): Vector3 {
    return Formeln3.rotateAroundCenter(
      pos,
      point.add(pos),
      angle
    )
  }
}