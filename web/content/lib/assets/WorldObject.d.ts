import { HitBox } from "../boundingBox/HitBox.js";
import ICollideable from "../property/ICollideable.js";
import IMoveable from "../property/IMoveable.js";
import Vector2 from "../util/Vector2.js";
import { SceneObject } from "./SceneObject.js";
export declare abstract class WorldObject<HitBoxType extends HitBox> extends SceneObject implements ICollideable, IMoveable {
    pos: Vector2;
    hitBox: HitBoxType;
    orientation: number;
    translatedPoints: Vector2[];
    alreadyTranslated: boolean;
    constructor(pos: Vector2, hitBox: HitBoxType, angle?: number);
    update(dt: number): void;
    abstract update2(dt: number): void;
    translatePoints(): Vector2[];
    shouldUpdate(): boolean;
    shouldRender(): boolean;
    isCollidingWith(other: ICollideable): boolean;
    rotate(angle: number): void;
    moveDirection(direction: number, distance: number): void;
    move(move: Vector2): void;
}
