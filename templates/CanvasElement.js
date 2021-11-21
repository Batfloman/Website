export default class CanvasElement {
    canvas;

    constructor(canvas) {
        this.canvas = canvas;
        
        let canvasElement = this;
        window.addEventListener("resize", function() {
            canvasElement.resize();
        });
        this.resize();
    }
    
    resize() {
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;
    }

    clear() {
        let ctx = this.canvas.getContext("2d");

        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    getCanvas() { return this.canvas;}
}