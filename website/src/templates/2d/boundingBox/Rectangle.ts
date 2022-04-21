import Vector2 from "../../util/Vector2.js";
import Polygon from "./Polygon2.js";

export default class Rectangle extends Polygon {
  constructor(width: number, height: number) {
    let model = new Array();

    width = !width ? 10 : width;
    height = !height ? 10 : height;
    
    model.push( new Vector2(0, 0));
    model.push( new Vector2(0, height));
    model.push( new Vector2(width, height));
    model.push( new Vector2(width, 0));
    
    super(model);

    this.centerModel();
  }
}