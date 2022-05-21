import { SceneObject } from "./../Objects/SceneObject.js";
export default class World {
    objects: SceneObject[];
    addObject(obj: SceneObject): void;
    removeObject(obj: SceneObject): SceneObject | undefined;
}
