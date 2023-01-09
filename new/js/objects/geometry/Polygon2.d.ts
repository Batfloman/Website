import { Vector2 } from "../../util/Vector2.js";
import { Geometry } from "./Geometry.js";
export declare class Polygon2 extends Geometry {
    model: Vector2[];
    constructor(model: Vector2[]);
    /**
     * offsets all Points to match the "real" center
     */
    centerModel(): void;
    findCenter(): Vector2;
    translate(pos: Vector2, orientation: number): Vector2[];
    scale(scalar: number): void;
}
