import { WorldObject } from "../../../../lib/assets/objects/WorldObject.js";
import Renderer from "../../../../lib/display/Renderer.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
import Vector2 from "../../../../lib/util/Vector2.js";

const pheromonSize = 1;
const duration = 35000;

export type Message = "home" | "food";

const colors = new Map<Message, Color>([
  ["home", Color.get("red")],
  ["food", Color.get("blue")],
]);

export default class Pheromon extends WorldObject<Circle> {
  // export default class Pheromon extends WorldObject<Rectangle> {
  message: Message;
  strength: number;

  color: Color;
  

  constructor(pos: Vector2, message: Message) {
    super(pos, new Circle(pheromonSize));
    // super(pos, new Rectangle(pheromonSize, pheromonSize));

    this.message = message;
    this.strength = 100;
    if (message == "home") this.zIndex = 5;
    if (message == "food") this.zIndex = 10;
    const color = colors.get(this.message)
    this.color = !color ? Color.get("red") : color;
  }

  update2(dt: number): void {
    this.strength -= dt * (100 / duration);
    if (this.strength <= 0) {
      this.game.removeObject(this);
    }
  }
  render(renderer: Renderer): void {
    this.color?.setA(this.strength);

    renderer.setStrokeColor(this.color);
    renderer.setFillColor(this.color);
    // renderer.renderCircle(this.pos, pheromonSize);
    renderer.renderRectangle(this.pos, pheromonSize, pheromonSize);
  }

  setColor(color: Color) {
    this.color = color;
  }
}
