import Vector2 from "../../util/Vector2.js";
import Polygon from "./Polygon2.js";

export default class Rectangle extends Polygon {
  constructor(width: number, height: number) {
    let model = new Array();

    width = !width ? 10 : width;
    height = !height ? 10 : height;
    
    model.push( new Vector2(width/2, height/2));
    model.push( new Vector2(width/2, -height/2));
    model.push( new Vector2(-width/2, -height/2));
    model.push( new Vector2(-width/2, height/2));
    
    super(model);
  }
}