import Polygon2 from "../physic/boundingBox/Polygon2.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";

export abstract class UIObject extends WorldObject {
  constructor(pos: Vector2, hitBox: Polygon2, angle?: number) {
    super(pos, hitBox, angle);

    this.zIndex = 10;
  }

  shouldRender(): boolean {
    return true;
  }

  abstract action(): void;
}
