import { SystemObject } from "../objects/SystemObject.js";
import { Util } from "../util/Util.js";
import { LoopingSystem } from "./LoopingSystem.js";
import * as THREE from "three";
import { Clock } from "../util/Clock.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Thread } from "../multiThreading/Thread.js";

export class Game extends LoopingSystem {
  static override instance: Game;

  protected gameObjects: SystemObject[] = [];
  protected sortedObjects: Map<string, SystemObject[]> = new Map();

  protected renderer: THREE.WebGLRenderer;
  protected camera: THREE.Camera;
  protected scene: THREE.Scene;
  protected controls: OrbitControls | undefined;

  constructor(
    canvas: HTMLCanvasElement,
    elements?: {
      renderer?: THREE.WebGLRenderer;
      camera?: THREE.Camera;
      scene?: THREE.Scene;
    }
  ) {
    super();
    Game.instance = this;

    this.renderer = elements?.renderer ?? new THREE.WebGLRenderer({ canvas });
    this.camera = elements?.camera ?? new THREE.Camera();
    this.scene = elements?.scene ?? new THREE.Scene();

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  loop(dt: number) {
    this.gameObjects.forEach((obj) => {
      obj.update(dt);
    });
    this.renderer.render(this.scene, this.camera);
  }

  public object = {
    add: (...objects: SystemObject[]): void => {
      objects.forEach((obj) => {
        // add to game
        Util.array.addItem(this.gameObjects, obj);
        if (!obj.threeObj.parent) this.scene.add(obj.threeObj);

        // add to sorted Map
        const sortedObjects = Game.instance.get.sortedObjects();
        const classes = Util.object.findAllClassNames(obj);
        classes.forEach((clas) => {
          Util.map.addItem(sortedObjects, clas, obj);
        });
      });
    },
    remove: (obj: SystemObject): void => {
      Util.array.removeItem(this.gameObjects, obj);
      this.scene.remove(obj.threeObj);

      const sortedObjects = Game.instance.get.sortedObjects();
      const classes = Util.object.findAllClassNames(obj);
      classes.forEach((clas) => {
        Util.map.removeItem(sortedObjects, clas, obj);
      });
    },
    getAll<K>(className: string): K[] {
      const sortedObjects = Game.instance.get.sortedObjects();

      return (sortedObjects.get(className) as K[]) ?? [];
    },
  };

  override get = {
    clock: (): Clock => this.clock,
    runningStatus: (): boolean => this.isRunning,
    objects: (): SystemObject[] => this.gameObjects,
    renderer: (): THREE.WebGLRenderer => this.renderer,
    camera: (): THREE.Camera => this.camera,
    scene: (): THREE.Scene => this.scene,
    sortedObjects: (): Map<string, SystemObject[]> => this.sortedObjects,
  };

  private resize() {
    const w = this.renderer.domElement.clientWidth;
    const h = this.renderer.domElement.clientHeight;

    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }
}
