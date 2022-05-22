import { SceneObject } from "./../Objects/SceneObject.js";
import Vector2 from "../../util/Vector2.js";
export default class World {
    objects: SceneObject[];
    private objectMap;
    isInsideWorld(point: Vector2): boolean;
    addObject(obj: SceneObject): void;
    removeObject(obj: SceneObject): SceneObject | undefined;
    findObjects<T extends SceneObject>(clasName: string, exclude?: T | T[]): T[];
    private addToMap;
    private removeFromMap;
}
