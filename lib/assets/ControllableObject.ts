import Input from "../input/Input.js";
import Polygon2 from "../physic/boundingBox/Polygon2.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";

export abstract class ControllableObject extends WorldObject {
  controlles: Map<inputKey, Function> = new Map();

  constructor(pos: Vector2, hitBox: Polygon2, angle?: number) {
    super(pos, hitBox, angle);
  }

  update(dt: number): void {
    this.controlles.forEach((value, key) => {
      if (Input.isPressed(key)) {
        value.call(this, dt);
      }
    });
  }
}
