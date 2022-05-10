import { HitBox } from "../physic/boundingBox/HitBox.js";
import Polygon2 from "../physic/boundingBox/Polygon2.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";

export abstract class UIObject<HitBoxType extends HitBox> extends WorldObject<HitBoxType> {
  constructor(pos: Vector2, hitBox: HitBoxType, angle?: number) {
    super(pos, hitBox, angle);

    this.zIndex = 10;
  }

  shouldRender(): boolean {
    return true;
  }

  abstract action(): void;
}
