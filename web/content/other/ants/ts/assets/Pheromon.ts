import { WorldObject } from "../../../../lib/assets/Objects/WorldObject.js";
import Renderer from "../../../../lib/display/Renderer.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import Vector2 from "../../../../lib/util/Vector2.js";

const pheromonSize = 1;
const duration = 17500;

export type Message = "home" | "food";

const colors = new Map<Message, Color>([
  ["home", Color.get("red")],
  ["food", Color.get("blue")],
]);

export default class Pheromon extends WorldObject<Circle> {
  message: Message;
  strength: number;

  constructor(pos: Vector2, message: Message) {
    super(pos, new Circle(pheromonSize));

    this.message = message;
    this.strength = 100;
    this.zIndex = 5;
  }

  update2(dt: number): void {
    this.strength -= dt * (100 / duration);
    if (this.strength <= 0) {
      this.game.removeObject(this);
    }
  }
  render(renderer: Renderer): void {
    const color = colors.get(this.message);
    color?.setA(this.strength);

    renderer.setStrokeColor(color);
    renderer.setFillColor(color);
    renderer.renderCircle(this.pos, pheromonSize);
  }
}
