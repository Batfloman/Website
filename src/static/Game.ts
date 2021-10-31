import GameElement from "./GameElement.js";
import CanvasElement from "./CanvasElement.js";

export default class Game {
    gameObjects: GameElement[] = new Array();

    started: boolean;
    paused: boolean;
    lastTime: number;

    canvasElement: CanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        if(!canvas) {
            console.log("no Canvas!");
            this.canvasElement = new CanvasElement(document.createElement("canvas"));
        } 
        else this.canvasElement = new CanvasElement(canvas);

        this.lastTime = Date.now();
        this.started = false;
        this.paused = false;
    }

    addObject(obj: GameElement) {
        if(!this.gameObjects.includes(obj) && obj instanceof GameElement) {
            this.gameObjects.push(obj);
            obj.init(this.canvasElement.getCanvas());
        }
            

    }

    removeObject(obj: GameElement) {
        if(this.gameObjects.includes(obj)) {
            let index = this.gameObjects.indexOf(obj);
            this.gameObjects.splice(index, index+1);
        }
    }

    start() {
        this.started = true;
        this.paused = false;
        this.lastTime = Date.now();
        this.loop();
    }

    stop() {
        this.started = false;
        this.paused = true;
    }

    pause() {
        this.paused = true;
    }

    continue() {
        this.lastTime = Date.now();
        this.paused = false;
    }

    loop() {
        if(!this.started) return;

        if(!this.paused) {
            let now = Date.now()
            let dt = now - this.lastTime;
            this.lastTime = now;

            this.canvasElement.clear();
            
            this.gameObjects.forEach(obj => {
                obj.update(dt);
                obj.render();
            })
        }
        
        window.requestAnimationFrame(() => this.loop());
    }
}