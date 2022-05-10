import Renderer from "../display/Renderer.js";
import Input from "../input/Input.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import { HitBox } from "../physic/boundingBox/HitBox.js";
import Rectangel from "../physic/boundingBox/Rectangel.js";
import Vector2 from "../util/Vector2.js";
import { UIObject } from "./UIObject.js";

export default class UIButton extends UIObject<Rectangel> {
  func: Function;

  constructor(pos: Vector2, width: number, height: number, action: Function) {
    let hitBox = new Rectangel(width, height);
    super(pos, hitBox, 0);

    this.func = action;

    Input.newEventListener("click", this, (event: MouseEvent) => {
      // test is click is in hitBox
    })
  }

  update(dt: number): void {}
  render(renderer: Renderer): void {
    renderer.renderPolygon(this.pos, this.hitBox, 0, false, true);
  }

  translatePoints(): Vector2[] {
    return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
  }

  action(): void {
    this.func.call(this);
  }
}
