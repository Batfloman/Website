import Vector2 from "../../util/Vector2";

export abstract class HitBox {
  isConvex!: boolean;
  farthestPoint!: Vector2;
}