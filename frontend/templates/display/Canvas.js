import WorldObject from "../assets/WorldObject.js";
import Input from "../input/Input.js";
import Vector2 from "../util/Vector2.js";

export default class Canvas {
  /** @type {HTMLCanvasElement} */
  htmlCanvas; 

  /** @type {Vector2} */
  viewOffSet;

  /** @type {boolean} */
  lockMovement = true;

  /** @type {Vector2} */
  lastPos = new Vector2(0,0);

  constructor(htmlCanvas) {
    this.htmlCanvas = htmlCanvas;

    Input.newEventListener("resize", this, this.resize);
    Input.newEventListener("mousemove", this, (event) => {
      if(!Input.mouseDown || this.lockMovement) return;
      this.updateViewOffSet(event.movementX, event.movementY);
    });
    Input.newEventListener("touchmove", this, (event) => {
      if(this.lockMovement) return;
      this.updateViewOffSet(event.touches[0].clientX- this.lastPos.x, event.touches[0].clientY- this.lastPos.y);
      this.lastPos = new Vector2(event.touches[0].clientX, event.touches[0].clientY);
    });
    Input.newEventListener("touchstart", this, (event) => {
      this.lastPos = new Vector2(event.touches[0].clientX, event.touches[0].clientY);
    })



    this.resize();
    this.viewOffSet = new Vector2(-this.htmlCanvas.width / 2, - (this.htmlCanvas.height / 2));
  }

  /**
   * @param {SceneObject[]} objects 
   */
  render(objects) {
    let ctx = this.htmlCanvas.getContext("2d");
    ctx.clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);
    
    if(!objects) return;

    objects.forEach(obj => {
      if(obj instanceof WorldObject && obj.isOnScreen()) {
        obj.render(ctx);
      }
    });
  }

  getMousePosWithViewOffSet() {
    if(!this.viewOffSet) return new Vector2();

    let mousePos = Input.getMousePosOffSet();
    let offSetted = new Vector2(
      mousePos.x + this.viewOffSet.x,
      mousePos.y + this.viewOffSet.y
    );
    return offSetted;
  }

  updateViewOffSet(xChange, yChange) {
    this.viewOffSet.x -= xChange;
    this.viewOffSet.y -= yChange;
  }

  resize() {
    this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
    this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
  }
}