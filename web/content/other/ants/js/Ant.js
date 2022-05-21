import { WorldObject } from "../../../lib/assets/Objects/WorldObject.js";
import Circle from "../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../lib/util/Color.js";
import Util from "../../../lib/util/Util.js";
import Vector2 from "../../../lib/util/Vector2.js";
const antSize = 3;
const antOrientationChange = 10;
export default class Ant extends WorldObject {
    constructor() {
        super(new Vector2(), new Circle(antSize), Util.math.randomBetween(0, 360, 2));
        this.task = "searchFood";
        this.zIndex = 10;
    }
    update2(dt) {
        switch (this.task) {
            case "goHome":
                break;
            case "searchFood":
                this.rotate(Util.math.randomBetween(-antOrientationChange, antOrientationChange, 2));
                this.moveDirection(this.orientation, this.calc_valueChangeForDT(50, dt));
                break;
        }
    }
    render(renderer) {
        renderer.setStrokeColor(Color.get("white"));
        renderer.setFillColor(Color.none);
        renderer.renderCircle(this.pos, antSize);
    }
}
