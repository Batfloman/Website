import Camara from "../../display/Camara.js";
import Collision from "../../physic/algorithms/Collision.js";
import { HitBox } from "../../physic/boundingBox/HitBox.js";
import ICollideable from "../../physic/property/ICollideable.js";
import IMoveable from "../../physic/property/IMoveable.js";
import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";

export abstract class WorldObject<HitBoxType extends HitBox>
  extends SceneObject
  implements ICollideable, IMoveable
{
  pos: Vector2;
  hitBox: HitBoxType;
  orientation: number;
  translatedPoints!: Vector2[];
  alreadyTranslated: boolean = false;

  constructor(pos: Vector2, hitBox: HitBoxType, angle = 0) {
    super();

    this.pos = pos;
    this.hitBox = hitBox;
    this.orientation = angle;
  }

  // don't override this; it does important suff
  update(dt: number): void {
    if (Util.distance(this.pos, this.game.getCamara().pos) > this.game.deleteDistance) {
      this.game.removeObject(this);
      return;
    }
    this.update2(dt);
  }

  abstract update2(dt: number): void;

  shouldUpdate(): boolean {
    return Util.distance(this.pos, this.game.getCamara().pos) < this.game.maxUpdateDistance;
  }
  shouldRender(): boolean {
    return this.isCollidingWith(this.game.getCamara());
  }

  translatePoints(): Vector2[] {
    if (this.alreadyTranslated) return this.translatedPoints;

    this.translatedPoints = this.hitBox.translatePoints(this.pos, this.orientation);
    return this.translatedPoints;
  }

  isCollidingWith(other: ICollideable): boolean {
    return Collision.testCollision(this, other);
  }

  // ==========================================================================================
  // move Object

  rotate(angle: number) {
    this.orientation += angle;
    this.orientation %= 360;

    this.alreadyTranslated = false;
  }
  moveDirection(direction: number, distance: number): void {
    this.pos = Util.moveDirection(this.pos, direction, distance);

    this.alreadyTranslated = false;
  }
  move(move: Vector2): void {
    this.pos = this.pos.add(move);

    this.alreadyTranslated = false;
  }
}
