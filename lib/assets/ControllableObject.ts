import Input from "../input/Input.js";
import { HitBox } from "../physic/boundingBox/HitBox.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";

export abstract class ControllableObject<HitBoxType extends HitBox> extends WorldObject<HitBoxType> {
  controlles: Map<inputKey, Function> = new Map();

  constructor(pos: Vector2, hitBox: HitBoxType, angle?: number) {
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
