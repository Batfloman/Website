export default class Canvas {
    
    canvas;
    rotates;
    fullScreen;
    
    constructor(canvas) {
        this.canvas = canvas;

        let that = this;
        window.addEventListener("resize", function() {
            that.resize();
        })
        window.addEventListener("focus", function() {
            that.resize();
        });
    }

    resize() {
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;
    }

    setRotation(b) {
        this.rotates = b;
    }
    setFullScreen(b) {
        this.fullScreen = b;
    }
}