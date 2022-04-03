import Vector2 from "../../../util/Vector2.js";
import Polygon from "./Polygon.js";

export default class Rectangle extends Polygon {
  constructor(width, height) {
    let model = new Array();
    
    model.push( new Vector2(width/2, height/2));
    model.push( new Vector2(width/2, -height/2));
    model.push( new Vector2(-width/2, -height/2));
    model.push( new Vector2(-width/2, height/2));
    
    super(model);
  }
}