import Actor from "./actor/Actor";
import CanvasElement from "./CanvasElement";
import SceneObject from "./gameAssets/SceneObject";

export default class Game {
    gameObjects: SceneObject[];
    players: Actor[];
    playerTurn: Actor;

    started: boolean = false;
    paused: boolean = false;
    lastTime : number;

    canvasElement: CanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvasElement = new CanvasElement(canvas);

        window.onblur = () => {this.pause();};
        window.onfocus = () => {this.continue();};
    }

    addObject(obj: SceneObject) {
        if(!this.gameObjects) this.gameObjects = new Array();

        if(!this.gameObjects.includes(obj) && (obj instanceof SceneObject)) {
            this.gameObjects.push(obj);
            if(this.started) obj.init(this);
        }
    }

    removeObject(obj: SceneObject) {
        if(this.gameObjects.includes(obj)) {
            let index = this.gameObjects.indexOf(obj);
            this.gameObjects.splice(index, index+1);
        }
    }

    addPlayer(player: Actor) {
        if(!this.players) this.players = new Array();

        if(!this.players.includes(player) && (player instanceof Actor)) {
            this.players.push(player);
            if(this.started) player.init(this);
        }
    }

    removePlayer(player: Actor) {
        if(this.players.includes(player)) {
            let index = this.players.indexOf(player);
            this.gameObjects.splice(index, index+1);
        }
    }

    start() {
        this.started = true;
        this.paused = false;
        this.lastTime = Date.now();
        this.gameObjects.forEach(obj => obj.init(this));
        this.players.forEach(player => player.init(this));
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
                if(dt > 0)  obj.update(dt);
                obj.render();
            })
            
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

    getCanvas() { return this.canvasElement.canvas;}

    findObjects(clas) {
        let objects = new Array();
        this.gameObjects.forEach(obj => {
            if(obj instanceof clas) objects.push(obj); 
        })
        return objects;
    }
}