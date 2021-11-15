import GameElement from "./GameObject.js";
import CanvasElement from "./CanvasElement.js";
import Input from "./Input.js";

export default class Game {
    gameObjects = new Array();

    started = false;
    paused = false;
    lastTime;

    canvasElement;

    constructor(canvasElement) {
        this.canvasElement = canvasElement;

        window.onblur = () => {this.pause();};
        window.onfocus = () => {this.continue();};
    }

    addObject(obj) {
        if(!this.gameObjects.includes(obj) && obj instanceof GameElement) {
            this.gameObjects.push(obj);
            if(this.started) obj.init(this);
        }
    }

    removeObject(obj) {
        if(this.gameObjects.includes(obj)) {
            let index = this.gameObjects.indexOf(obj);
            this.gameObjects.splice(index, index+1);
        }
    }

    start() {
        this.started = true;
        this.paused = false;
        this.lastTime = Date.now();
        this.gameObjects.forEach(obj => obj.init(this));
        this.loop(this);
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
        return;
    }

    getCanvas() { return this.canvasElement.canvas;}

    findObjects(clas) {
        let objects = new Array();
        this.gameObjects.forEach(obj => {
            if(obj instanceof clas) objects.push(obj); 
        })
        return objects;
    }
}