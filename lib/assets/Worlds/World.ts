import { SceneObject } from "./../Objects/SceneObject.js";
import Game from "../games/Game.js";
import Vector2 from "../../util/Vector2.js";

export default class World {
  objects: SceneObject[] = [];

  isInsideWorld(point: Vector2): boolean {
    return true;
  }

  // ==========================================================================================
  // manage Objects

  addObject(obj: SceneObject): void {
    if(this.objects.includes(obj)) return;

    this.objects.push(obj);
  } 

  removeObject(obj: SceneObject): SceneObject | undefined {
    const index = this.objects.indexOf(obj);
    return this.objects.splice(index, 1)[0];
  }
}