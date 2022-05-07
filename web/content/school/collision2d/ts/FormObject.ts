import { ControllableObject } from "../../../lib/assets/ControllableObject.js";
import Renderer from "../../../lib/display/Renderer.js";
import Polygon2 from "../../../lib/physic/boundingBox/Polygon2.js";
import { Color } from "../../../lib/util/Color.js";
import Vector2 from "../../../lib/util/Vector2.js";

export default class FormObject extends ControllableObject {
  collides: boolean = false;
  selected: boolean = false;

  rotationSpeed: number = 0;

  constructor(pos: Vector2, hitBox: Polygon2, angle?: number) {
    super(pos, hitBox, angle);

    this.controlles.set("w", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(
        0,
        this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scale, dt)
      );
    });
    this.controlles.set("a", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(
        -90,
        this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scale, dt)
      );
    });
    this.controlles.set("s", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(
        180,
        this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scale, dt)
      );
    });
    this.controlles.set("d", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(
        90,
        this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scale, dt)
      );
    });
    this.controlles.set("q", (dt: number) => {
      if (!this.selected) return;
      this.rotate(this.calc_valueChangeForDT(90, dt));
    });
    this.controlles.set("e", (dt: number) => {
      if (!this.selected) return;
      this.rotate(this.calc_valueChangeForDT(-90, dt));
    });
  }

  update(dt: number): void {
    super.update(dt);
    this.rotate(this.calc_valueChangeForDT(this.rotationSpeed, dt));

    let objects = this.game.findObjects(FormObject, this) as Array<ControllableObject>;
    
    objects.forEach((obj) => {
      this.collides = this.checkCollision(obj);
      if (this.collides) return;
    });
  }
  render(renderer: Renderer): void {
    renderer.setLineWidth(3);
    renderer.setStrokeColor(
      this.collides ? Color.get("white") : Color.get("black")
    );
    renderer.polygon(this.pos, this.hitBox, this.orientation, true);

    renderer.setStrokeColor(Color.get("black"));
    renderer.setFillColor(this.selected ? Color.get("black") : Color.none);
    renderer.renderCircle(this.pos, 10);

  }
}
