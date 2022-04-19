import Input from "../input/Input.js";
export default class Canvas {
    constructor(htmlCanvas) {
        if (htmlCanvas == null)
            htmlCanvas = document.createElement("canvas");
        this.htmlCanvas = htmlCanvas;
        Input.newEventListener("resize", this, this.resize);
        this.resize();
    }
    render(scene) {
        if (!scene)
            return;
        let ctx = this.htmlCanvas.getContext("2d");
        if (!ctx)
            return;
        ctx.clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);
        if (!!ctx)
            scene.render(ctx);
    }
    resize() {
        this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
        this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
    }
}
