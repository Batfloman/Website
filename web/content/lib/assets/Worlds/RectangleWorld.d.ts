import Vector2 from "../../util/Vector2";
import World from "./World";
export default class RechtangleWorld extends World {
    width: number;
    height: number;
    constructor(width: number, height: number);
    isInsideWorld(point: Vector2): boolean;
}
