import { ControllableObject } from "../../../lib/assets/ControllableObject.js"
import Polygon2 from "../../../lib/physic/boundingBox/Polygon2.js";
import Vector2 from "../../../lib/util/Vector2.js";


export default class GameObject extends ControllableObject {
  constructor(pos: Vector2, hitBox: Polygon2, angle?: number) {
    super(pos, hitBox, angle);
  }

  update(dt: number): void {
    super.update(dt);

    console.log(dt);
  }
}