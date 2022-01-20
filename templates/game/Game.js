import Actor from "./actor/Actor.js";
import CanvasElement from "./window/CanvasElement.js";
import GameObject from "./gameAssets/elements/GameElement.js";

export default class Game {

    gameObjects = new Array();
    players = new Array();
    playerTurn;

    // Run
    started = false;
    paused = false;
    lastTime;

    canvasElement;

    constructor(canvas) {
        this.canvasElement = new CanvasElement(canvas);

        window.onblur = () => {this.pause();};
        window.onfocus = () => {this.continue();};
    }

    addObject(obj) {
        if(!this.gameObjects.includes(obj) && (obj instanceof GameObject)) {
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

    addPlayer(player) {
        if(!this.players.includes(player) && (player instanceof Actor)) {
            this.players.push(player);
            if(this.started) player.init(this);
        }
    }

    start() {
        this.started = true;
        this.paused = false;
        this.lastTime = Date.now();
        this.gameObjects.forEach(obj => obj.init(this));
        this.players.forEach(player => player.init(this));
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
            
            this.updateObjects(dt);
            
            if(this.players.length != 0) {
                if(!this.playerTurn) {
                    this.playerTurn = this.players[ Math.floor( Math.random() * this.players.length)];
                    this.playerTurn.yourTurn();
                }
                if(!this.playerTurn.isMyTurn) {
                    let i = this.players.indexOf(this.playerTurn) + 1;
                    if(i >= this.players.length) i = 0;
                    this.playerTurn = this.players[i];
                    this.playerTurn.yourTurn();
                }
            }  
        }
        
        window.requestAnimationFrame(() => this.loop());
    }

    updateObjects(dt) {
        this.canvasElement.clear();
        this.gameObjects.forEach(obj => {
            if(dt > 0) obj.update(dt);
            obj.render();
        })
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