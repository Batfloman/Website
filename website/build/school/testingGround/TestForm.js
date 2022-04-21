import Polygon3 from "../../templates/3d/boundingBox/Polygon3.js";
import Point from "../../templates/3d/Point.js";
import Vector3 from "../../templates/util/Vector3.js";
export default class TestForm extends Polygon3 {
    constructor(numVertecies, radius) {
        if (numVertecies < 4)
            numVertecies = 4;
        let model = new Array();
        let phi = Math.PI * (3. - Math.sqrt(5.));
        for (let i = 0; i < numVertecies; i++) {
            let y = 1 - (i / (numVertecies - 1)) * 2;
            let r = Math.sqrt(1 - y * y);
            let theta = phi * i;
            let x = Math.cos(theta) * r;
            let z = Math.sin(theta) * r;
            model.push(new Point(new Vector3(x, y, z).stretch(radius)));
        }
        super(model);
    }
}
