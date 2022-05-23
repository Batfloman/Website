import { WorldObject } from "../../../../lib/assets/Objects/WorldObject.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import Util from "../../../../lib/util/Util.js";
export default class Food extends WorldObject {
    constructor(pos, amountFood) {
        super(pos, new Circle(Util.shapes.circle.radius(amountFood)));
        this.amountFood = amountFood;
    }
    update2(dt) {
        if (this.amountFood <= 0) {
            this.game.removeObject(this);
        }
    }
    render(renderer) {
        this.hitBox.radius = Util.shapes.circle.radius(this.amountFood) / 5;
        renderer.setFillColor(Color.get("green"));
        renderer.setStrokeColor(Color.get("green"));
        renderer.renderCircle(this.pos, this.hitBox.radius);
    }
}
