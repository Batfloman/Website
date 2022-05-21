import { SceneObject } from "../assets/SceneObject";
export default class World {
    objects: SceneObject[];
    addObject(obj: SceneObject): void;
    removeObject(obj: SceneObject): SceneObject | undefined;
}
