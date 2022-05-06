import WorldObject from "../../../lib/assets/WorldObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import Polygon2 from "../../../lib/physic/boundingBox/Polygon2.js";
import { Color } from "../../../lib/util/Color.js";
import Vector2 from "../../../lib/util/Vector2.js";

export default class FormObject extends WorldObject {
  constructor(pos: Vector2, hitBox: Polygon2, angle?: number) {
    super(pos, hitBox, angle)
  }
  
  update(dt: number): void {
    this.rotate(this.calc_valueChangeForDT(45, dt));
  }
  render(renderer: Renderer): void {
    renderer.setLineWidth(2);
    renderer.setFillColor(Color.get("red"));
    renderer.polygon(this.pos, this.hitBox, this.orientation, true);
  }

  
}