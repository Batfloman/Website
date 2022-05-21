import { SceneObject } from "../assets/SceneObject";
import { Game } from "../games/Game";

export default class World {
  objects: SceneObject[] = [];

  addObject(obj: SceneObject) {
    if(this.objects.includes(obj)) return;

    this.objects.push(obj);
  } 

  removeObject(obj: SceneObject): SceneObject | undefined {
    const index = this.objects.indexOf(obj);
    return this.objects.splice(index, 1)[0];
  }
}