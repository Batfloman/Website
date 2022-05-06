import Renderer from "../display/Renderer.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import SAT from "../physic/algorithms/SAT.js";
import Polygon from "../physic/boundingBox/Polygon2.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";

export default class WorldObject
  extends SceneObject
  implements ICollideable, IMoveable
{
  pos: Vector2;
  hitBox: Polygon;
  orientation: number;

  constructor(pos: Vector2, hitBox: Polygon, angle?: number) {
    super();

    this.pos = pos;
    this.hitBox = hitBox;
    this.orientation = !angle ? 0 : angle;
    this.translatePoints();
  }

  update(dt: number): void {
    throw new Error("Method not implemented.");
  }
  render(renderer: Renderer): void {
    throw new Error("Method not implemented.");
  }

  shouldRender(): boolean {
    return this.checkCollision(this.game.getCamara());
  }

  checkCollision(other: ICollideable): boolean {
    return SAT.testCollision(this, other);
  }
  moveDirection(direction: number, distance: number): void {
    this.pos = Util.moveDirection(this.pos, direction, distance);
  }
  move(move: Vector2): void {
    this.pos = this.pos.add(move);
  }
  translatePoints(): Vector2[] {
    return Polygon2Helper.translatePoints(
      this.hitBox.model,
      this.pos,
      this.orientation
    );
  }

  rotate(angle: number) {
    this.orientation += angle;
    this.orientation %= 360;
  }
}
