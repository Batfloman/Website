"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const Polygon2_js_1 = require("../../../../../lib/physic/boundingBox/Polygon2.js");
const Util_js_1 = require("../../../../../lib/util/Util.js");
const Vector2_js_1 = require("../../../../../lib/util/Vector2.js");
class Form extends Polygon2_js_1.Polygon2 {
    constructor(numVertices, radius, irregularity = 0) {
        let model = [];
        for (let i = 0; i < numVertices; i++) {
            model.push(Util_js_1.Util.moveDirection(new Vector2_js_1.Vector2(), (360 / numVertices) * i, Form.randomDistance(radius, irregularity)));
        }
        super(model);
    }
    static randomDistance(normal, irregularity = 0) {
        return Util_js_1.Util.math.round(Util_js_1.Util.math.random.between(-1, 2, 5) * normal * irregularity + normal, 2);
    }
}
exports.Form = Form;
