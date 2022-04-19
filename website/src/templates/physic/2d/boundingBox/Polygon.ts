import Formeln from "../../../Formeln.js";
import Vector2 from "../../../util/Vector2.js";
import Color from "../../../util/Color.js";

export default class Polygon {
  // points relative to a 0, 0 center with 0° rotation
  model: Vector2[] = new Array();
  // angle in degree
  angle: number = 0;

  points: Vector2[];

  constructor(model: Vector2[]) {
    if(!model || !(model instanceof Array)) throw new Error(`${model} is no valid model`);

    this.model = model;
    this.points = model;
  }

  translatePoints(pos: Vector2): Vector2[] {
    this.points = new Array();

    this.model.forEach(point => {
      this.points.push(Formeln.rotateAroundCenter(
        pos,
        new Vector2(
          Math.round(point.x + pos.x),
          Math.round(point.y + pos.y)
        ),
        this.angle
      ))
    })

    return this.points;
  }

  getFarthestPoint(pos: Vector2) {
    return Formeln.farthestPoint(pos, this.translatePoints(pos));
  }

  getClosestPoint(pos: Vector2) {
    return Formeln.closestPoint(pos, this.translatePoints(pos));
  }

  /**
   * offsets all Points to match the "real" center
   */
  centerModel(): void {
    let centerX = 0;
    let centerY = 0;
    // adds all cordinates together
    this.model.forEach(point => {
      centerX += point.x;
      centerY += point.y;
    })
    // get the "durchschnitt"
    let moveX = centerX / this.model.length;
    let moveY = centerY / this.model.length;
    // offsets the model Points by the offset from the centerpoint to the "real" centerpoint
    // => makes the centerpoint the real centerpoint
    this.model.forEach(point => {
      point.x -= Math.round(moveX*100) / 100;
      point.y -= Math.round(moveY*100) / 100;
    })
  }

  setAngle(angle: number): void {
     this.angle = angle;
  }

  rotate(degree: number): void { 
    this.angle += degree;
    this.angle %= 360;
  }
}