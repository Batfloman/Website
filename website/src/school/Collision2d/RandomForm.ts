import Formeln from "../../templates/2d/Formeln2.js";
import Polygon from "../../templates/2d/boundingBox/Polygon2.js";
import Vector2 from "../../templates/util/Vector2.js";
import Util from "../../templates/util/Util.js";

export default class RandomForm extends Polygon {
  constructor(radius: number, numVertices: number, irregularity: number, startAngle?: number) {
    if(irregularity < 0 || irregularity > 1) throw new Error(`${irregularity} is not valid!`);

    let model = new Array();
    for(let i = 0; i < numVertices; i++) {
      let angle = (360 / numVertices) * i + (!startAngle ? 0 : startAngle % 360);
      model.push( Formeln.moveDirection(new Vector2(0,0), angle, RandomForm.noise(radius, irregularity, numVertices)));
    }
    super(model);
  }

  static noise(value: number, noiseVaule: number, numVertices: number) {
    let noiseChange = (noiseVaule * (Math.floor( Math.random() * value * 2) - value)) / 1.2;

    return value + noiseChange;
  }

  static zufälligeForm(radius: number, numVertices: number, irregularity: number) {
    let form = new Array();
    for(let i = 0; i < numVertices; i++) {
      let mittelPunkt = new Vector2(0, 0);
      let gradWert = (360 / numVertices) * i;
      let distanz = (Util.randomBetween(-1, 1) * irregularity * radius) + radius
      form.push( Formeln.moveDirection(
        mittelPunkt,
        gradWert, 
        distanz,
      ))
    }
    return form;
  }

}