import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import SAT from "../physic/algorithms/SAT.js";
import Polygon from "../physic/boundingBox/Polygon2.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import IPositionable from "../physic/property/IPositionable.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";

export abstract class WorldObject
  extends SceneObject
  implements ICollideable, IMoveable
{
  pos: Vector2;
  hitBox: Polygon;
  orientation: number;

  points!: Vector2[];

  constructor(pos: Vector2, hitBox: Polygon, angle?: number) {
    super();

    this.pos = pos;
    this.hitBox = hitBox;
    this.orientation = !angle ? 0 : angle;
    this.translatePoints();
  }

  checkCollision(other: ICollideable): boolean {
    return SAT.testCollision(this, other);
  };
  moveDirection(direction: number, distance: number): void {
    this.pos = Util.moveDirection(this.pos, direction, distance);
  }
  move(move: Vector2): void {
    this.pos = this.pos.add(move);
  }
  translatePoints(): Vector2[] {
    this.points = Polygon2Helper.translatePoints(
      this.hitBox.model,
      this.pos,
      this.orientation
    );

    return this.points;
  }
}
