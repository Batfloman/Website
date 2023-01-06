import { GameObject } from "../objects/GameObject.js";
import { Util } from "../util/Util.js";
import { System } from "./System.js";
import * as THREE from "three";
import { Input } from "../input/Input.js";
import { Scene } from "../display/Scene.js";
import { Camera } from "../display/Camera.js";
import { Renderer } from "../display/Renderer.js";

export class Game extends System {
  private gameObjects: GameObject[] = [];

  private scene: THREE.Scene | Scene;
  private camera: THREE.Camera | Camera;
  private renderer: THREE.Renderer | Renderer;

  constructor(canvas: HTMLCanvasElement, useThree = true) {
    super();
  }

  override loop(dt: number) {
    this.renderer.render(this.scene, this.camera);
  }

  public object = {
    add: (obj: GameObject) => {
      Util.array.addItem(this.gameObjects, obj);
      this.scene.add(obj.mesh);
    },
    remove: (obj: GameObject) => {
      Util.array.removeItem(this.gameObjects, obj);
      this.scene.remove(obj.mesh);
    },
  };
}