import Formeln from "../../templates/2d/Formeln2.js";
import Polygon from "../../templates/2d/boundingBox/Polygon2.js";
import Vector2 from "../../templates/util/Vector2.js";
export default class ConvexIrregular extends Polygon {
    constructor(radius, numVerticies, irregularity, startAngle) {
        if (irregularity < 0 || irregularity > 1)
            throw new Error(`${irregularity} is not valid!`);
        let model = new Array();
        for (let i = 0; i < numVerticies; i++) {
            let angle = (360 / numVerticies) * i + (!startAngle ? 0 : startAngle % 360);
            model.push(Formeln.moveDirection(new Vector2(0, 0), angle, ConvexIrregular.noise(radius, irregularity, numVerticies)));
        }
        super(model);
    }
    static noise(value, noiseVaule, numVerticies) {
        let noiseChange = (noiseVaule * (Math.floor(Math.random() * value * 2) - value)) / (numVerticies / 2);
        return value + noiseChange;
    }
}
