import { WorldObject } from "../../../../lib/assets/objects/WorldObject.js";
import { Circle } from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import { Util } from "../../../../lib/util/Util.js";
const minRadius = 10;
const foodScaleFactor = 0.5;
export class Food extends WorldObject {
    constructor(pos, amountFood) {
        super(pos, new Circle(Util.shapes.circle.radius(amountFood) * foodScaleFactor));
        this.amountFood = amountFood;
        this.zIndex = 99;
    }
    update(dt) {
        this.hitBox.radius = Math.max(minRadius, Util.shapes.circle.radius(this.amountFood) * foodScaleFactor);
        if (this.amountFood > 0)
            return;
        this.game.removeObject(this);
    }
    render(renderer) {
        renderer.setFillColor(Color.get("green"));
        renderer.setStrokeColor(Color.get("green"));
        renderer.renderCircle(this.pos, this.hitBox.radius);
    }
}
