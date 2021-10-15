import Options from "../game/Options.js";
import GameObject from "./GameObject.js";

export default class Drone extends GameObject{
    player;
    orientation;

    size = {
        w: 5,
        h: 5
    }

    constructor(player, pos, orientation) {
        super();
        this.player = player;
        this.pos = {
            x: pos.x,
            y: pos.y
        };
        this.orientation = orientation;
    }
    
    update(dt) {
        let moveX = Math.sin(this.orientation * (Math.PI/180)) * dt * Options.droneSpeedPerS / 1000;
        let moveY = -Math.cos(this.orientation * (Math.PI/180)) * dt * Options.droneSpeedPerS / 1000;

        this.pos.x += moveX;
        this.pos.y += moveY;
    }

    render() {
        let c = document.getElementById("game-screen");
        let ctx = c.getContext("2d");

        ctx.fillStyle = this.player.getColor().getRGB();
        ctx.strokeStyle = this.player.getColor().getRGB();
        
        let x = this.pos.x-this.size.w/2 + Options.mouseOffSetX + Options.canvasWidth;
        let y = this.pos.y-this.size.h/2 + Options.mouseOffSetY + Options.canvasHeight;

        ctx.fillRect(x, y, this.size.w, this.size.h);
    }
}