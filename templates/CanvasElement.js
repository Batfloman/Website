export default class CanvasElement {
    canvas;

    width;
    height;

    constructor(canvas) {
        this.canvas = canvas;

        window.addEventListener("resize", this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;
    }

    clear() {
        let ctx = this.canvas.getContext("2d");

        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    get canvas() { return this.canvas;}
}