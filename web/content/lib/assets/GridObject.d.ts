import Renderer from "../display/Renderer.js";
import Rectangle from "../physic/boundingBox/Rectangle.js";
import Matrix2 from "../util/Matrix2.js";
import Vector2 from "../util/Vector2.js";
import { WorldObject } from "./WorldObject.js";
export declare abstract class GridObject<Type> extends WorldObject<Rectangle> {
    grid: Matrix2<Type>;
    constructor(pos: Vector2, width: number, height: number);
    render(renderer: Renderer): void;
    abstract renderCell(x: number, y: number, renderer: Renderer): void;
}
