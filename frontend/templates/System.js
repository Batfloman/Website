import SceneObject from "./assets/SceneObject.js";
import WorldObject from "./assets/WorldObject.js";
import Canvas from "./display/Canvas.js";

export default class System {
  /** @type {Canvas} */
  canvas;

  /** @type {SceneObject[]} */
  objects = new Array();
  
  /** @type {number} - last timestamp to calculate "dt"*/
  timeLast;

  interval;

  constructor(canvas) {
    if(!(canvas instanceof Canvas)) throw new Error(`${canvas} is supposed to be instanceof Canvas!`);
    
    this.canvas = canvas;
  }

  addObject(obj) {
    if(!obj || !(obj instanceof SceneObject)) throw new Error(`${obj} is no SceneObject`);
    if(this.objects.includes(obj)) throw new Error(`${obj} is already added!`);

    this.objects.push(obj);
    obj.init(this.canvas);
  }

  start() {
    this.interval = setInterval(() => {
      this.tick();
    }, 10);
  }

  stop() {
    clearInterval(this.interval);
  }

  tick() {
    if(!this.timeLast) this.timeLast = Date.now();
    let timeNow = Date.now();
    let dt = timeNow - this.timeLast;
    this.timeLast = timeNow;

    this.objects.forEach(obj => {
      obj.update(dt);
    })

    this.canvas.render(this.objects);
  }
}