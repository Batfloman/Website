import Renderer, { staticPosition } from "../../../display/Renderer.js";
import Rectangle from "../../../physic/boundingBox/Rectangle.js";
import { Color } from "../../../util/Color.js";
import Vector2 from "../../../util/Vector2.js";
import { WorldObject } from "../WorldObject.js";
export default class UISimpleButton extends WorldObject<Rectangle> {
    color: Color;
    staticPos: Vector2 | staticPosition;
    constructor(staticPos: Vector2 | staticPosition, width: number, height: number);
    update2(dt: number): void;
    render(renderer: Renderer): void;
    translatePoints(): Vector2[];
}
