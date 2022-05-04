import Polygon from "../physic/boundingBox/Polygon2.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import Vector2 from "../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";
export declare abstract class WorldObject extends SceneObject implements ICollideable, IMoveable {
    pos: Vector2;
    hitBox: Polygon;
    orientation: number;
    points: Vector2[];
    constructor(pos: Vector2, hitBox: Polygon, angle?: number);
    abstract update(dt: number): void;
    abstract render(ctx: CanvasRenderingContext2D): void;
    abstract checkCollision(other: ICollideable): boolean;
    move(direction: number, distance: number): void;
    translatePoints(): Vector2[];
}
