import { ControllableObject } from "../../../../old/web/content/lib/assets/objects/ControllableObject.js";
import { Color } from "../../../../old/web/content/lib/util/Color.js";
import { Vector2 } from "../../../../old/web/content/lib/util/Vector2.js";
import { Triangulation } from "../../../../old/web/content/lib/physic/algorithms/Triangulation.js";
import { Util } from "../../../../old/web/content/lib/util/Util.js";
import { Polygon2Helper } from "../../../../old/web/content/lib/physic/algorithms/Polygon2Helper.js";
import { WorldObject } from "../../../../old/web/content/lib/assets/objects/WorldObject.js";
import { Renderer } from "../../../../old/web/content/lib/display/Renderer.js";
import { Polygon2 } from "../../../../old/web/content/lib/physic/boundingBox/Polygon2.js";
import { System } from "./System.js";
import { Input } from "../../../../old/web/content/lib/input/Input.js";

export const selectDistance = 10;

export class FormObject extends ControllableObject<Polygon2> {
  collides: boolean = false;
  selected: boolean = false;

  game!: System;

  rotationSpeed: number = Util.math.random.between(45, 135) * Util.math.random.mathSign();

  constructor(pos: Vector2, hitBox: Polygon2, angle?: number) {
    super(pos, hitBox, angle);

    this.addControll("w", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(0, this.calc_valueChangeForDT((90 * 1) / this.camara.scaleValue, dt));
    });
    this.addControll("a", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(-90, this.calc_valueChangeForDT((90 * 1) / this.camara.scaleValue, dt));
    });
    this.addControll("s", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(180, this.calc_valueChangeForDT((90 * 1) / this.camara.scaleValue, dt));
    });
    this.addControll("d", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(90, this.calc_valueChangeForDT((90 * 1) / this.camara.scaleValue, dt));
    });
    this.addControll("q", (dt: number) => {
      if (!this.selected) return;
      this.rotate(this.calc_valueChangeForDT(90, dt));
    });
    this.addControll("e", (dt: number) => {
      if (!this.selected) return;
      this.rotate(this.calc_valueChangeForDT(-90, dt));
    });

    this.addControll("left", () => {
      if (!this.selected) return;
      Input.isPressed("shift") ? this.rotate(1) : this.move(new Vector2(-1, 0));
    }, 100);
    this.addControll("right", () => {
      if (!this.selected) return;
      Input.isPressed("shift") ? this.rotate(-1) : this.move(new Vector2(1, 0));
    }, 100);
    this.addControll("up", () => {
      if (!this.selected) return;
      this.move(new Vector2(0, 1));
    }, 100);
    this.addControll("down", () => {
      if (!this.selected) return;
      this.move(new Vector2(0, -1));
    }, 100);
  }

  update2(dt: number): void {
    if (!this.selected) {
      this.rotate(this.calc_valueChangeForDT(this.rotationSpeed, dt) * this.game.speedMult);
    }

    let objects: FormObject[] = this.world.findObjectsInNeighbouringChunks<FormObject>(
      this.chunk,
      FormObject,
      this
    );

    for (let obj of objects) {
      this.collides = this.isCollidingWith(obj);
      if (this.collides) break;
    }
  }
  render(renderer: Renderer): void {
    renderer.setLineWidth(3);
    renderer.setStrokeColor(this.collides ? Color.get("white") : Color.get("black"));
    renderer.setFillColor(this.collides ? Color.get("white") : Color.get("black"));
    renderer.renderPolygon(this.pos, this.hitBox, this.orientation, true, true);

    renderer.setLineWidth(0.5);
    if (!this.hitBox.isConvex) {
      let parts = Triangulation.triangulate(this) as Array<WorldObject<Polygon2>>;
      for (let part of parts) {
        renderer.renderPolygon(part.pos, part.hitBox, part.orientation, false, true);
      }
    }

    renderer.setLineWidth(3);
    renderer.setStrokeColor(Color.get("black"));
    renderer.setFillColor(this.selected ? Color.get("black") : Color.none);

    renderer.renderCircle(this.pos, selectDistance);

    renderer.setLineWidth(0.33);
    renderer.setFillColor(Color.none);
    renderer.renderCircle(this.pos, this.hitBox.farthestDistance);
  }

  translatePoints(): Vector2[] {
    return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
  }
}
