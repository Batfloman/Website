import { WorldObject } from "../../../../lib/assets/Objects/WorldObject.js";
import Renderer from "../../../../lib/display/Renderer.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import Util from "../../../../lib/util/Util.js";
import Vector2 from "../../../../lib/util/Vector2.js";

export default class Food extends WorldObject<Circle> {
  amountFood: number;

  constructor(pos: Vector2, amountFood: number) {
    super(pos, new Circle(Util.shapes.circle.radius(amountFood)));

    this.amountFood = amountFood;
  }

  update2(dt: number): void {
    if (this.amountFood <= 0) {
      this.game.removeObject(this);
    }
  }
  render(renderer: Renderer): void {
    this.hitBox.radius = Util.shapes.circle.radius(this.amountFood) / 5;

    renderer.setFillColor(Color.get("green"));
    renderer.setStrokeColor(Color.get("green"));
    renderer.renderCircle(this.pos, this.hitBox.radius);
  }
}
