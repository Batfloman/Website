import SceneObject from "../assets/SceneObject.js";
import WorldObject from "../assets/WorldObject.js";
import Input from "../input/Input.js";
import Vector2 from "../util/Vector2.js";

export default class Canvas {
  htmlCanvas: HTMLCanvasElement;

  viewOffSet: Vector2;

  lockScrolling: boolean = true;

  lastPos: Vector2 = new Vector2(0, 0);

  constructor(htmlCanvas: HTMLCanvasElement | null) {
    if(htmlCanvas == null) htmlCanvas = document.createElement("canvas");
    this.htmlCanvas = htmlCanvas;

    Input.newEventListener("resize", this, this.resize);
    Input.newEventListener("mousemove", this, (event: MouseEvent) => {
      if (!Input.mouseDown || this.lockScrolling) return;
      this.updateViewOffSet(event.movementX, event.movementY);
    });
    Input.newEventListener("touchmove", this, (event: TouchEvent) => {
      if (this.lockScrolling) return;
      this.updateViewOffSet(event.touches[0].clientX - this.lastPos.x, event.touches[0].clientY - this.lastPos.y);
      this.lastPos = new Vector2(event.touches[0].clientX, event.touches[0].clientY);
    });
    Input.newEventListener("touchstart", this, (event: TouchEvent) => {
      this.lastPos = new Vector2(event.touches[0].clientX, event.touches[0].clientY);
    })

    this.resize();
    this.viewOffSet = new Vector2(-this.htmlCanvas.width / 2, - (this.htmlCanvas.height / 2));
  }

  render(objects: SceneObject[]) {
    if (!objects) return;
    
    let ctx = this.htmlCanvas.getContext("2d");
    if(!ctx) return;

    ctx.clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);

    objects.forEach(obj => {
      if (obj instanceof WorldObject && obj.isOnScreen()) {
        if(!!ctx) obj.render(ctx);
      }
    });
  }

  getMousePosWithViewOffSet() {
    if (!this.viewOffSet) return new Vector2(0, 0);

    let mousePos = Input.getMousePosOffSet();
    let offSetted = new Vector2(
      mousePos.x + this.viewOffSet.x,
      mousePos.y + this.viewOffSet.y
    );
    return offSetted;
  }

  updateViewOffSet(xChange: number, yChange: number) {
    this.viewOffSet.x -= xChange;
    this.viewOffSet.y -= yChange;
  }

  resize() {
    this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
    this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
  }
}