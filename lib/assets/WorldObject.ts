import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import Polygon from "../physic/boundingBox/Polygon2.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import IPositionable from "../physic/property/IPositionable.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";

export abstract class WorldObject extends SceneObject implements ICollideable, IMoveable {
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

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
  
  abstract checkCollision(other: ICollideable): boolean;
  
  move(direction: number, distance: number): void {
    this.pos = Util.moveDirection(this.pos, direction, distance);
  }

  translatePoints(): Vector2[] {
    this.points = Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);

    return this.points;
  }
}