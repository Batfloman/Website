import { GameObject } from "../objects/GameObject.js";
import { Util } from "../util/Util.js";
import { System } from "./System.js";
import * as THREE from "three";

export class Game extends System {
  private gameObjects: GameObject[] = [];

  private renderer: THREE.WebGLRenderer;
  private camera: THREE.Camera;
  private scene: THREE.Scene;

  constructor(canvas: HTMLCanvasElement) {
    super();

    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
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
