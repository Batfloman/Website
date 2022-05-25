import { HitBox } from "../../physic/boundingBox/HitBox.js";
import ICollideable from "../../physic/property/ICollideable.js";
import IMoveable from "../../physic/property/IMoveable.js";
import Vector2 from "../../util/Vector2.js";
import { Chunk } from "../worlds/Chunk.js";
import World from "../worlds/World.js";
import { SceneObject } from "./SceneObject.js";
export declare abstract class WorldObject<HitBoxType extends HitBox> extends SceneObject implements ICollideable, IMoveable {
    constructor(pos: Vector2, hitBox: HitBoxType, angle?: number);
    update(dt: number): void;
    abstract update2(dt: number): void;
    shouldUpdate(): boolean;
    shouldRender(): boolean;
    protected world: World;
    protected chunk: Chunk;
    setWorld(world: World): void;
    setChunk(chunk: Chunk): void;
    pos: Vector2;
    hitBox: HitBoxType;
    orientation: number;
    translatedPoints: Vector2[];
    alreadyTranslated: boolean;
    translatePoints(): Vector2[];
    isCollidingWith(other: ICollideable): boolean;
    rotate(angle: number): void;
    moveDirection(direction: number, distance: number): void;
    move(move: Vector2): void;
}
