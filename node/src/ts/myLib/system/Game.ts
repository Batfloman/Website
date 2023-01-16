import { SystemObject } from "../objects/SystemObject.js";
import { Util } from "../util/Util.js";
import { LoopingSystem } from "./LoopingSystem.js";
import * as THREE from "three";
import { Clock } from "../util/Clock.js";

export class Game extends LoopingSystem {
  protected gameObjects: SystemObject[] = [];

  protected renderer: THREE.WebGLRenderer;
  protected camera: THREE.Camera;
  protected scene: THREE.Scene;

  constructor(
    canvas: HTMLCanvasElement,
    elements?: {
      renderer?: THREE.WebGLRenderer;
      camera?: THREE.Camera;
      scene?: THREE.Scene;
    }
  ) {
    super();

    this.renderer = elements?.renderer ?? new THREE.WebGLRenderer({ canvas });
    this.camera = elements?.camera ?? new THREE.Camera();
    this.scene = elements?.scene ?? new THREE.Scene();

    window.addEventListener("resize", this.resize);
    this.resize();
  }

  loop(dt: number) {
    this.renderer.render(this.scene, this.camera);
  }

  public object = {
    add: (obj: SystemObject) => {
      console.log("add", obj);
      Util.array.addItem(this.gameObjects, obj);
      this.scene.add(obj.mesh);
    },
    remove: (obj: SystemObject) => {
      Util.array.removeItem(this.gameObjects, obj);
      this.scene.remove(obj.mesh);
    },
  };

  override get = {
    clock: (): Clock => this.clock,
    runningStatus: (): boolean => this.isRunning,
    objects: (): SystemObject[] => this.gameObjects,
    renderer: (): THREE.WebGLRenderer => this.renderer,
    camera: (): THREE.Camera => this.camera,
    scene: (): THREE.Scene => this.scene,
  };

  private resize() {
    const w = this.renderer.domElement.clientWidth;
    const h = this.renderer.domElement.clientHeight;

    this.renderer.setSize(w, h, false);

    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }
}
