import { Vector2 } from "../../util/Vector2";

export abstract class Geometry {
  abstract translate(pos: Vector2, orientation: number): Vector2[];
  abstract scale(scalar: number): void;
}
