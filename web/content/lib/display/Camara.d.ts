import Polygon2 from "../physic/boundingBox/Polygon2.js";
import ICollideable from "../physic/property/ICollideable.js";
import IMoveable from "../physic/property/IMoveable.js";
import Vector2 from "../util/Vector2.js";
import Canvas from "./Canvas";
export default class Camara implements ICollideable, IMoveable {
    private canvas;
    pos: Vector2;
    scale: number;
    hitBox: Polygon2;
    orientation: number;
    translatedPoints: Vector2[];
    alreadyTranslated: boolean;
    lockScaling: boolean;
    lockMovement: boolean;
    constructor(canvas: Canvas, pos?: Vector2);
    moveDirection(direction: number, distance: number): void;
    move(move: Vector2): void;
    isCollidingWith(other: ICollideable): boolean;
    translatePoints(): Vector2[];
    getOffset(): Vector2;
    setScale(scale: number): void;
}
