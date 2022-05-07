import Polygon2 from "../physic/boundingBox/Polygon2.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import Vector2 from "../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";
export declare abstract class WorldObject extends SceneObject implements ICollideable, IMoveable {
    pos: Vector2;
    hitBox: Polygon2;
    orientation: number;
    constructor(pos: Vector2, hitBox: Polygon2, angle?: number);
    rotate(angle: number): void;
    shouldRender(): boolean;
    checkCollision(other: ICollideable): boolean;
    translatePoints(): Vector2[];
    moveDirection(direction: number, distance: number): void;
    move(move: Vector2): void;
}
