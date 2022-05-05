import Polygon2 from "../physic/boundingBox/Polygon2.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";

export abstract class ControllableObject extends WorldObject {
  controlles: Map<string, Function> = new Map();

  constructor(pos: Vector2, hitBox: Polygon2, angle?: number) {
    super(pos, hitBox, angle);
  }

  update(dt: number): void {
    this.controlles.forEach((value, key) => {
      console.log(value, key);
    });
  }
}
