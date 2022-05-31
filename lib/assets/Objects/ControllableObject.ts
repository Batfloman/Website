import { Input } from "../../input/Input.js";
import { HitBox } from "../../physic/boundingBox/HitBox.js";
import { WorldObject } from "./WorldObject.js";

export abstract class ControllableObject<HitBoxType extends HitBox> extends WorldObject<HitBoxType> {
  protected controlles: Map<inputKey, Function> = new Map();

  // recommended to call "super.update" in subclasses
  update(dt: number): void {
    this.controlles.forEach((value, key) => {
      if (Input.isPressed(key)) {
        value.call(this, dt);
      }
    });
    this.update2(dt);
  }
}
