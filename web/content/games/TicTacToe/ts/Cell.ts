import { WorldObject } from "../../../lib/assets/WorldObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import Rectangel from "../../../lib/physic/boundingBox/Rectangel.js";

export default class Cell extends WorldObject<Rectangel> {
  update2(dt: number): void {}
  render(renderer: Renderer): void {
    renderer.renderRectangle(this.pos, this.hitBox.width, this.hitBox.height);
  }
}