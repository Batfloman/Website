import { GameObject } from "../objects/GameObject.js";
import { System } from "./System.js";

export class Game extends System {
  private gameObjects: GameObject[] = [];

  override loop() {
  }
}