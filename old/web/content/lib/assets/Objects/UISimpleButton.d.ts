import { Renderer, staticPosition } from "../../display/Renderer";
import { Rectangle } from "../../physic/boundingBox/Rectangle";
import { Color } from "../../util/Color";
import { Vector2 } from "../../util/Vector2";
import { WorldObject } from "./WorldObject";
export declare class UISimpleButton extends WorldObject<Rectangle> {
    color: Color;
    staticPos: Vector2 | staticPosition;
    constructor(staticPos: Vector2 | staticPosition, width: number, height: number);
    update2(dt: number): void;
    render(renderer: Renderer): void;
    translatePoints(): Vector2[];
}
