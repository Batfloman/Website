import { GameObject } from "../objects/GameObject.js";
import { Util } from "../util/Util.js";
import { System } from "./System.js";
import * as THREE from "three";
import { Input } from "../input/Input.js";

export class Game extends System {
  private gameObjects: GameObject[] = [];

  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.Renderer;

  constructor(canvas: HTMLCanvasElement, useThree = true) {
    super();

    if (useThree) {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75);
      this.renderer = new THREE.WebGLRenderer({ canvas });

      {
        const resizeFunc = () => {
          const canvas = this.renderer.domElement;
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
  
          this.renderer.setSize(w, h, false);
          this.camera.aspect = w / h;
          this.camera.updateProjectionMatrix();
        };
        resizeFunc();
        Input.newEventListener("resize", this, resizeFunc);
      }
    } else {
      throw new Error("other not implemented");
    }
  }

  override loop(dt: number) {
    this.camera.translateZ(dt)

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
