import { ControllableObject } from "../../../../old/web/content/lib/assets/objects/ControllableObject.js";
import { WorldObject } from "../../../../old/web/content/lib/assets/objects/WorldObject.js";
import { Canvas } from "../../../../old/web/content/lib/display/Canvas.js";
import { Renderer } from "../../../../old/web/content/lib/display/Renderer.js";
import { Game } from "../../../../old/web/content/lib/games/Game.js";
import { Polygon2Helper } from "../../../../old/web/content/lib/physic/algorithms/Polygon2Helper.js";
import { Triangulation } from "../../../../old/web/content/lib/physic/algorithms/Triangulation.js";
import { HitBox } from "../../../../old/web/content/lib/physic/boundingBox/HitBox.js";
import { Polygon2 } from "../../../../old/web/content/lib/physic/boundingBox/Polygon2.js";
import { Color } from "../../../../old/web/content/lib/util/Color.js";
import { Vector2 } from "../../../../old/web/content/lib/util/Vector2.js";
import { FormObject } from "./FormObject.js";
import { System } from "./System.js";

const selectDistance = 10;

export class TestObject extends ControllableObject<Polygon2> {
  selected: boolean = true;
  collides: boolean = false;
  rotationSpeed: number = 90;

  game!: System;
  
  constructor(pos: Vector2, hitBox: Polygon2, angle: number = 0) {
    super(pos, hitBox, angle);

    this.addControll("w", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(0, this.calc_valueChangeForDT((90) / this.camara.scaleValue, dt));
    });
    this.addControll("a", (dt: number) => {
      if (!this.selected) return;
      this.moveDirection(-90, this.calc_valueChangeForDT((90) / this.camara.scaleValue, dt));
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
