import { WorldObject } from "../../../lib/assets/Objects/WorldObject.js";
import Circle from "../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../lib/util/Color.js";
import Vector2 from "../../../lib/util/Vector2.js";
export default class AntHill extends WorldObject {
    constructor() {
        super(new Vector2(), new Circle(50));
    }
    update2(dt) {
    }
    render(renderer) {
        renderer.setStrokeColor(Color.get("brown"));
        renderer.setFillColor(Color.get("brown"));
        renderer.renderCircle(this.pos, 50);
    }
}
