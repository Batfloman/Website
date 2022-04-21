import Formeln from "../Formeln2.js";
import Vector2 from "../../util/Vector2.js";
import Color from "../../util/Color.js";
import Polygon2Helper from "../collision/Polygon2Helper.js";
import Triangulation from "../collision/Triangulation.js";

export default class Polygon2 {
  // points relative to a 0, 0 center with 0° rotation
  model: Vector2[] = new Array();
  // angle in degree
  angle: number = 0;

  isConvex: boolean;
  convexParts: Polygon2[] | null;

  constructor(model: Vector2[]) {
    this.model = model;

    this.isConvex = Polygon2Helper.isConvex(this);
    this.convexParts = this.isConvex ? null : Triangulation.triangulate(this.model);
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