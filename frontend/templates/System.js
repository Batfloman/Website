import Canvas from "./display/Canvas.js";

export default class System {
  canvas;

  objects = new Array();

  bPaused = true;
  
  timeLast;

  constructor(canvas) {
    if(canvas instanceof Canvas) this.canvas = canvas;
    this.loop(this);
  }

  addObject(obj) {
    if(!obj || this.objects.includes(obj)) return;

    this.objects.push(obj);
  }

  start() {
    this.bPaused = false;
  }

  stop() {
    this.bPaused = true;
  }

  loop(that) {
    if(that.bPaused) {
      setTimeout(() => {
        that.loop(that);
      }, 100);
      return;
    }

    that.tick();    

    window.requestAnimationFrame(that.loop(that));
  }

  tick() {
    if(!this.timeLast) this.timeLast = Date.now;

    let timeNow = Date.now;
    let dt = timeNow - this.timeLast;
    this.timeLast = timeNow;

    this.objects.forEach(obj => {
      obj.rotate(1);  
    })

    this.canvas.render(this.objects);
  }
}