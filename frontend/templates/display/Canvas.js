export default class Canvas {
  htmlCanvas; 

  constructor(htmlCanvas) {
    this.htmlCanvas = htmlCanvas;

    let that = this;
    this.htmlCanvas.addEventListener("resize", () => {
      that.resize();
      that.render();
    });
    that.resize();
  }

  render(objects) {
    if(!this.htmlCanvas) throw new Error("no Canvas");
    
    let ctx = this.htmlCanvas.getContext("2d");
    
    ctx.clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);

    objects.forEach(obj => {
      obj.render(ctx);
    })
  }

  resize() {
    this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
    this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
  }
}