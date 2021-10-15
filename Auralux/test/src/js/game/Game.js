import Drone from "../gameassets/Drone.js";
import Map from "../maps/Map.js";
import Player from "../Actors/Player.js";
import Color from "../util/Color.js";
import Options from "./Options.js";

export default class Game {
    lastTime;
    
    interval;
    paused = false;

    gameObjects = [];
    players = [];
    map;

    mouseDown = false;
    clickPos = {
        x: 0,
        y: 0,
    }

    constructor() {
        let canvas = document.getElementById("game-screen");

        ['mousedown', 'touchstart'].forEach(listener => {
            canvas.addEventListener(listener, function(event) {
                this.mouseDown = true;
                this.clickPos = {
                    x: event.offsetX,
                    y: event.offsetY
                }
            })
        });
        ['mousemove', 'touchmove'].forEach(listener => {
            canvas.addEventListener(listener, function(event) {
                if(!this.mouseDown) return;

                Options.mouseOffSetX -= this.clickPos.x - event.offsetX;
                Options.mouseOffSetY -= this.clickPos.y - event.offsetY;

                this.clickPos = {
                    x: event.offsetX,
                    y: event.offsetY
                }
            })
        });
        ['mouseup', 'touchend'].forEach(listener => {
            canvas.addEventListener(listener, function() {this.mouseDown = false;});
        });
        ['mouseleave', 'touchcancel'].forEach(listener => {
            canvas.addEventListener(listener, function() {this.mouseDown = false;});
        });
        
        canvas.oncontextmenu = event => event.preventDefault(); 
    }

    start(mapNumber) {
        this.lastTime = Date.now();
        fetch("src/js/maps/Maps.json")
        .then(response => response.json())
        .then(json => {
            this.loadMap(json[mapNumber < 0 || mapNumber == undefined | null ? 0 : mapNumber])
            this.interval = setInterval(this.gameLoop, Options.gameSpeed, this);
        });
    }

    stop() { clearInterval(this.interval);}

    pause() { 
        this.paused = true;
    }

    continue() { this.paused = false;}

    gameLoop(game) {
        let current = Date.now();
        let dt = current - game.lastTime;
        game.lastTime = current;
        if(this.paused || dt > Options.gameSpeed * 4) return;

        let c = document.getElementById("game-screen")
        c.getContext("2d").clearRect(0, 0, c.width, c.height);
        game.renderObjects();
        game.updateObjects(dt);
    }

    renderObjects() {
        let canvas = document.getElementById("game-screen");
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "white";
        ctx.font = "20px serif";
        ctx.fillText((Options.mouseOffSetX + Options.canvasWidth) + " | " + (Options.mouseOffSetY + Options.canvasHeight), 10, 20);
        this.gameObjects.forEach(gameObject => {
            gameObject.render();
        });
    }

    updateObjects(dt) {
        this.gameObjects.forEach(gameObject => {
            gameObject.update(dt);
        });
    }

    loadMap(map) {
        if(this.players == null | undefined) this.players = new Array();
        for(let i = 0; i < map.players; i++) {
            this.players[i] = new Player(Color.getRandomPlayerColor());
        }
        this.map = new Map(this, map.name, this.players, map.suns);

        this.gameObjects.forEach(gameObject => {
            gameObject.init(this);
        });
    }

    addObject(obj, queued) {
        if(this.gameObjects == null | undefined) this.gameObjects = new Array();
        obj.init(this);
        this.gameObjects.push(obj);

        if(this.gameObjects.length >= Options.maxEntities) {
            for(let i = 0; i < this.gameObjects.length; i++) {
                if(this.gameObjects[i] instanceof Drone) {
                    this.gameObjects.splice(i, queued != null | undefined && queued > 0 ? queued : 2);
                    if(this.gameObjects.length <= Options.maxEntities) return;
                }
            }
        }
    }
}





