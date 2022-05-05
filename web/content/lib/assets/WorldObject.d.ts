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
    checkCollision(other: ICollideable): boolean;
    moveDirection(direction: number, distance: number): void;
    move(move: Vector2): void;
    translatePoints(): Vector2[];
}
