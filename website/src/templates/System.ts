import Canvas from "./display/Canvas.js";
import { SceneObject } from "./assets/SceneObject.js";
import Scene from "./display/Scene.js";

export default class System {
  canvas: Canvas;
  scenes: Map<string, Scene> = new Map();
  activeScene: Scene | undefined;

  // last timestamp | used to calculate "dt"
  timeLast!: number;

  // loop
  interval!: number;

  // if user is on moblie 
  isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  constructor(canvas: Canvas) {
    if (!(canvas instanceof Canvas)) throw new Error(canvas + " is not instanceof Canvas!");

    this.canvas = canvas;
    this.scenes.set("main", new Scene(canvas));
    this.activeScene = this.scenes.get("main");
  }

  addObject(obj: SceneObject) {
    if (!this.activeScene) return;

    this.activeScene.addObject(obj);
    obj.init(this);
  }

  removeObject(obj: SceneObject): SceneObject | null {
    if (!this.activeScene) return null;

    return this.activeScene.removeObject(obj);
  }

  findObjects(clas: Function, exclude?: Array<SceneObject> | SceneObject): SceneObject[] | null {
    if (!this.activeScene) return null;

    return this.activeScene.findObjects(clas, exclude);
  }

  addScene(scene: Scene, name?: string) {
    this.scenes.set(name == undefined ? "scene" + this.scenes.size : name, scene);
  }

  activateScene(name: string) {
    let scene = this.scenes.get(name);
    if (scene != null) this.activeScene = scene;
  }

  start() {
    this.interval = setInterval(() => {
      this.tick();
    }, 25);
  }

  stop() {
    clearInterval(this.interval);
  }

  tick() {
    if (!this.timeLast) this.timeLast = Date.now();
    let timeNow = Date.now();
    let dt = timeNow - this.timeLast;
    this.timeLast = timeNow;

    this.activeScene?.update(dt);
    let ctx = this.canvas.htmlCanvas.getContext("2d");
    if(!! ctx) {
      ctx.clearRect(0, 0, this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);      
      this.activeScene?.render(ctx);
    }
  }
}