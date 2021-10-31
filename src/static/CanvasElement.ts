export default class CanvasElement {
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.resize();
        window.addEventListener("resize", this.resize);
    }

    resize() {
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;
    }

    clear() {
        let ctx = this.canvas.getContext("2d");
        
        if(ctx == null) return;

        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    getCanvas() { return this.canvas;}
}