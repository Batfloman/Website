import Color from "../../../../../templates/util/Color.js";
import GameObject from "../../../../../templates/gameAssets/GameObject.js";
import Ball from "./Ball.js";
import Vector2f from "../../../../../templates/util/Vector2f.js";

export default class Paddle extends GameObject {
    static maxSpeed = 250;
    static timeNeeded = 2;
    static acceleration = 2 * Paddle.maxSpeed / Paddle.timeNeeded;
    
    constructor(x, y, isBot) {
        super();

        this.pos = new Vector2f(x, y);
        this.w = 20;
        this.h = 100;

        this.isBot = isBot == true;

        this.color = new Color(255, 255, 255);
    }

    update(dt) {
        // if(!this.isBot) {
            
        // } else {
            let balls = this.game.findObjects(Ball);
            
            let y = balls[0].pos.y;

            if(y > this.pos.y) {
                if(this.move.y < Paddle.maxSpeed) this.move.y += Paddle.acceleration / dt;
            } else {
                if(this.move.y > -Paddle.maxSpeed) this.move.y -= Paddle.acceleration / dt;
            }

            super.update(dt)
            
            // TODO welcher ist der näheste Ball mit richtung zu mir
        // }
    }

    render() {
        let canvas = this.game.getCanvas();
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = this.color.getRGB();

        ctx.fillRect(this.pos.x - this.w / 2, this.pos.y - this.h / 2, this.w, this.h);
    }
}