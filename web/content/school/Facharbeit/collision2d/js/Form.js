import Polygon2 from "../../../../lib/physic/boundingBox/Polygon2.js";
import Util from "../../../../lib/util/Util.js";
import Vector2 from "../../../../lib/util/Vector2.js";
export default class Form extends Polygon2 {
    constructor(numVertices, radius, irregularity = 0) {
        let model = [];
        for (let i = 0; i < numVertices; i++) {
            model.push(Util.moveDirection(new Vector2(), (360 / numVertices) * i, Form.randomDistance(radius, irregularity)));
        }
        super(model);
    }
    static randomDistance(normal, irregularity = 0) {
        return Util.math.round.round(Util.math.random.between(-1, 2, 5) * normal * irregularity + normal, 2);
    }
}
