import GameObject from "../gameassets/GameObject.js";
import Options from "../game/Options.js";
import Color from "../util/Color.js";
import Drone from "./Drone.js";

export default class Sun extends GameObject {
    player;
    color;
    level = 1;
    orientation = 0;

    timePassed = 0;

    constructor(player, x, y, level) {
        super();

        this.player = player;
        if(player != undefined) this.color = player.getColor();
        else this.color = new Color(45, 45, 45);
        if(level != undefined) this.level = level;
        else this.level = 1;
        this.pos = {x,y};
        this.orientation = Math.floor( Math.random()*360);
    }

    spawnDrones() {
        if(this.player == null | undefined) return;

        let offSet = 360 / (this.level * 2);
        let counter = 0;
        for(let i = 0; i < this.level*2; i++) {
            this.game.addObject(new Drone(this.player, this.pos, this.orientation + (counter++ * offSet)), this.level * 2);
        }
        return;
    }

    update(dt) {
        this.timePassed += dt;
        while(this.timePassed >= Options.spawnSpeed) {
            this.spawnDrones();
            this.timePassed -= Options.spawnSpeed;
        }
        
        if(this.orientation >= 360) this.orientation = 0;
        this.orientation += Options.rotationsSpeed / (1000 / dt);
        this.orientation = Math.round(this.orientation);
    }

    render() {
        let canvas = document.getElementById("game-screen");
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = this.color.getRGB();
        ctx.strokeStyle = this.color.getRGB();
        ctx.lineWidth = 1;
        
        ctx.beginPath();

        let x = this.pos.x + Options.mouseOffSetX + Options.canvasWidth;
        let y = this.pos.y + Options.mouseOffSetY + Options.canvasHeight;

        ctx.arc(x, y, Options.initialSunSize + ((this.level-1) * Options.addedSunSize), 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}