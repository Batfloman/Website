import Formeln from "../../templates/Formeln";
import Polygon from "../../templates/physic/2d/boundingBox/Polygon";
import Vector2 from "../../templates/util/Vector2";

export default class Form extends Polygon {
  constructor(radius: number, numVerticies: number, startAngle: number) {
    if(!radius || !(Number.isInteger(radius))) throw new Error(`${radius} is not a valid Number`)
    if(!numVerticies || !(Number.isInteger(numVerticies))) throw new Error(`${numVerticies} is not a valid Number`)

    let model = new Array();
    for(let i = 0; i < numVerticies; i++) {
      let angle = (360 / numVerticies) * i + (!startAngle ? 0 : startAngle % 360);
      model.push( Formeln.moveDirection(new Vector2(0,0), angle, radius));
    }
    super(model);
  }
}