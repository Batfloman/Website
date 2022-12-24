import { Vector2 } from "../../util/Vector2.js";
import { Geometry } from "./Geometry.js";
export declare class Circle extends Geometry {
    radius: number;
    constructor(radius?: number);
    translate(pos: Vector2, orientation: number): Vector2[];
    scale(scalar: number): void;
}
