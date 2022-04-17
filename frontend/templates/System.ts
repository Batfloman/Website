import SceneObject from "./assets/SceneObject";
import Canvas from "./display/Canvas";

export default class System {
  canvas: Canvas;

  /** @type {SceneObject[]} */
  objects: SceneObject[] = new Array();
  
  // last timestamp | used to calculate "dt"
  timeLast!: number;

  interval!: number;

  // if user is on moblie 
  isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  constructor(canvas: Canvas) {
    if(!(canvas instanceof Canvas)) throw new Error(canvas + " is not instanceof Canvas!");
    
    this.canvas = canvas;
  }

  addObject(obj: SceneObject) {
    if(this.objects.includes(obj)) return;

    this.objects.push(obj);
    obj.init(this.canvas, this);
  }

  removeObject(obj: SceneObject): SceneObject|void {
    if(!(this.objects.includes(obj))) {
      console.warn(`${obj} is not there!`); 
      return;
    }
    let index = this.objects.indexOf(obj);
    return this.objects.splice(index, 1)[0]; 
  }

  findObjects(clas: Function, exclude?: (SceneObject | SceneObject[])): SceneObject[] {
    if(!clas) throw new Error(clas + " is not valid as class");

    let foundObjects = new Array();

    this.objects.forEach(obj => {
      if(exclude instanceof SceneObject && obj == exclude) return; 
      if(exclude instanceof Array && exclude.includes(obj)) return;

      if(obj instanceof clas) {
        foundObjects.push(obj);
      }
    })

    return foundObjects;
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

    this.objects.sort((a, b) => (a.zIndex > b.zIndex) ? 1 : -1)
    this.canvas.render(this.objects);
  }
}