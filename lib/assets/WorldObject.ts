import Collision from "../physic/algorithms/Collision.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import Polygon2 from "../physic/boundingBox/Polygon2.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";

export abstract class WorldObject extends SceneObject implements ICollideable, IMoveable {
  pos: Vector2;
  hitBox: Polygon2;
  orientation: number;

  constructor(pos: Vector2, hitBox: Polygon2, angle = 0) {
    super();

    this.pos = pos;
    this.hitBox = hitBox;
    this.orientation = angle;
  }

  rotate(angle: number) {
    this.orientation += angle;
    this.orientation %= 360;
  }

  checkCollision(other: ICollideable): boolean {
    return Collision.testCollision(this, other);
  }
  translatePoints(): Vector2[] {
    return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
  }
  moveDirection(direction: number, distance: number): void {
    this.pos = Util.moveDirection(this.pos, direction, distance);
  }
  move(move: Vector2): void {
    this.pos.add(move);
  }
}