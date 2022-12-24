import { Renderer } from "../../display/Renderer.js";
import { Vector2 } from "../../util/Vector2.js";
import { World } from "./World.js";
export declare class RectangleWorld extends World {
    width: number;
    height: number;
    constructor(width: number, height: number);
    isInsideWorld(point: Vector2): boolean;
    render(renderer: Renderer): void;
}
