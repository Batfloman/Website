import Vector2 from "../../util/Vector2.js";
import Polygon2Helper from "../algorithms/Polygon2Helper.js";

export default class Polygon2 {
  // points relative to a 0, 0 center with 0° rotation
  model: Vector2[] = new Array();
  // angle in degree
  angle: number = 0;

  isConvex: boolean;

  constructor(model: Vector2[], startAngle?: number) {
    this.model = model;

    this.isConvex = Polygon2Helper.isConvex(this);
    this.angle = !startAngle ? 0 : startAngle;
  }

  /**
   * offsets all Points to match the "real" center
   */
  centerModel(): void {
    let realCenter = this.findCenter();
    this.model.forEach(point => {
      point.x -= Math.round(realCenter.x*100) / 100;
      point.y -= Math.round(realCenter.y*100) / 100;
    })
  }

  findCenter(): Vector2 {
    let center = new Vector2(0, 0);

    this.model.forEach(point => {
      center = center.add(point);
    })

    let realCenter = center.scale(1 / this.model.length);

    return realCenter;
  }
}