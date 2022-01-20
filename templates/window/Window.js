import Scene from "./Scene.js";

export default class Window {
    
    canvas;
    scenes = new Array();

    constructor(canvas) {
        this.canvas = !canvas ? this.findCanvas() : canvas;

        let canvasElement = this;
        window.addEventListener("resize", function() {
            canvasElement.resizeEvent();
        });
        this.resizeEvent();
    }

    // ===== init canvas =====
    
    findCanvas() {
        let canvases = document.getElementsByTagName("canvas");
        return (canvases.length <= 0 ? this.createCanvas() : canvases[0]);
    }

    createCanvas() {
        let canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        return canvas;
    }

    // ===== size fullscreen =====
    
    resizeEvent() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // ===== draw =====

    clear() {
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        if(this.scenes.length <= 0) return;

        this.scenes.forEach(scene => {
            scene.render();
        });   
    }

    addScene(scene) {
        if(!(scene instanceof Scene) || this.scenes.includes(scene)) return;

        this.scenes.push(scene);
        scene.setWindow(this);
    }

    // ===== getter & setter =====

    getCanvas() { return this.canvas;}
    getSize() { return {
        x: this.canvas.width,
        y: this.canvas.height
    }}
}