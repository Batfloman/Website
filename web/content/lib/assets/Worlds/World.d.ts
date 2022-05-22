import { SceneObject } from "./../Objects/SceneObject.js";
import Vector2 from "../../util/Vector2.js";
import IRenderable from "../../display/IRenderable.js";
import Renderer from "../../display/Renderer.js";
import { Color } from "../../util/Color.js";
export default class World implements IRenderable {
    objects: SceneObject[];
    backgroundColor: Color;
    private objectMap;
    constructor();
    isInsideWorld(point: Vector2): boolean;
    shouldRender(): boolean;
    render(renderer: Renderer): void;
    addObject(obj: SceneObject): void;
    removeObject(obj: SceneObject): SceneObject | undefined;
    findObjects<T extends SceneObject>(clasName: string, exclude?: T | T[]): T[];
    private addToMap;
    private removeFromMap;
}
