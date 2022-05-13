import Vector2 from "../../util/Vector2";

export abstract class HitBox {
  isConvex!: boolean;
  farthestPoint!: Vector2;

  abstract translatePoints(pos: Vector2, orientation: number): Vector2[];

  abstract scale(scalar: number): void;
}