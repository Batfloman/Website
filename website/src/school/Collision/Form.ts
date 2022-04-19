import Formeln from "../../templates/Formeln.js";
import Polygon from "../../templates/physic/2d/boundingBox/Polygon.js";
import Vector2 from "../../templates/util/Vector2.js";

export default class Form extends Polygon {
  constructor(radius: number, numVerticies: number, startAngle: number) {
    let model = new Array();
    for(let i = 0; i < numVerticies; i++) {
      let angle = (360 / numVerticies) * i + (!startAngle ? 0 : startAngle % 360);
      model.push( Formeln.moveDirection(new Vector2(0,0), angle, radius));
    }
    super(model);
  }
}