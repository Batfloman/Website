import Formeln from "../../templates/2d/Formeln2.js";
import Polygon from "../../templates/2d/boundingBox/Polygon2.js";
import Vector2 from "../../templates/util/Vector2.js";
export default class RandomForm extends Polygon {
    constructor(radius, numVertices, irregularity, startAngle) {
        if (irregularity < 0 || irregularity > 1)
            throw new Error(`${irregularity} is not valid!`);
        let model = new Array();
        for (let i = 0; i < numVertices; i++) {
            let angle = (360 / numVertices) * i + (!startAngle ? 0 : startAngle % 360);
            model.push(Formeln.moveDirection(new Vector2(0, 0), angle, RandomForm.noise(radius, irregularity, numVertices)));
        }
        super(model);
    }
    static noise(value, noiseVaule, numVertices) {
        let noiseChange = (noiseVaule * (Math.floor(Math.random() * value * 2) - value)) / 1.2;
        return value + noiseChange;
    }
}
