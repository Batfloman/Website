import Vector2 from "../../util/Vector2.js";
import Polygon from "./Polygon2.js";

export default class Rectangel extends Polygon {
  constructor(width: number, height: number, startAngle?: number) {
    let model = [
      new Vector2(0, 0),
      new Vector2(width, 0),
      new Vector2(0, height),
      new Vector2(width, height)
    ];

    super(model, startAngle);

    this.centerModel();
  }
}