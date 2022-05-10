import { WorldObject } from "../../assets/WorldObject.js";
import Renderer from "../../display/Renderer.js";
import Vector2 from "../../util/Vector2.js";
import Polygon2 from "../boundingBox/Polygon2.js";
export default class TestObject extends WorldObject<Polygon2> {
    constructor(pos: Vector2, hitBox: Polygon2, angle?: number);
    update(dt: number): void;
    render(renderer: Renderer): void;
    translatePoints(): Vector2[];
}
