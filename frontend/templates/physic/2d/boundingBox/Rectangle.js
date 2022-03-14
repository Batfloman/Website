import Vector2 from "../../../util/Vector2.js";
import Polygon from "./Polygon.js";

export default class Rectangle extends Polygon {
  constructor(w, h, pos) {
    if(!w || !h || !pos) throw new Error("parameter!");

    
    let points = new Array();

    points.push(new Vector2(0, 0));
    points.push(new Vector2(0, h));
    points.push(new Vector2(w, 0));
    points.push(new Vector2(w, h));

    super(points, pos);
  }
}