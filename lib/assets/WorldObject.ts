import Collision from "../physic/algorithms/Collision.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import { HitBox } from "../physic/boundingBox/HitBox.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";

export abstract class WorldObject<HitBoxType extends HitBox> extends SceneObject implements ICollideable, IMoveable {
  pos: Vector2;
  hitBox: HitBoxType;
  orientation: number;

  constructor(pos: Vector2, hitBox: HitBoxType, angle = 0) {
    super();

    this.pos = pos;
    this.hitBox = hitBox;
    this.orientation = angle;
  }

  rotate(angle: number) {
    this.orientation += angle;
    this.orientation %= 360;
  }

  shouldUpdate(): boolean {
    return Util.distance(this.pos, this.game.getCamara().pos) < this.game.maxRenderDistance;
  }

  shouldRender(): boolean {
    if (Util.distance(this.pos, this.game.getCamara().pos) < this.game.maxRenderDistance)
      return this.checkCollision(this.game.getCamara());
    return false;
  }

  checkCollision(other: ICollideable): boolean {
    return Collision.testCollision(this, other);
  }
  abstract translatePoints(): Vector2[];
  // {
  //   // return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
  // }
  moveDirection(direction: number, distance: number): void {
    this.pos = Util.moveDirection(this.pos, direction, distance);
  }
  move(move: Vector2): void {
    this.pos = this.pos.add(move);
  }
}
