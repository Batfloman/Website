import { HitBox } from "../physic/boundingBox/HitBox.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import Vector2 from "../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";
export declare abstract class WorldObject<HitBoxType extends HitBox> extends SceneObject implements ICollideable, IMoveable {
    pos: Vector2;
    hitBox: HitBoxType;
    orientation: number;
    constructor(pos: Vector2, hitBox: HitBoxType, angle?: number);
    rotate(angle: number): void;
    shouldUpdate(): boolean;
    shouldRender(): boolean;
    checkCollision(other: ICollideable): boolean;
    abstract translatePoints(): Vector2[];
    moveDirection(direction: number, distance: number): void;
    move(move: Vector2): void;
}
