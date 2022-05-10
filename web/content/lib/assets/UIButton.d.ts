import Renderer from "../display/Renderer.js";
import Rectangel from "../physic/boundingBox/Rectangel.js";
import Vector2 from "../util/Vector2.js";
import { UIObject } from "./UIObject.js";
export default class UIButton extends UIObject<Rectangel> {
    func: Function;
    constructor(pos: Vector2, width: number, height: number, action: Function);
    update(dt: number): void;
    render(renderer: Renderer): void;
    translatePoints(): Vector2[];
    action(): void;
}
