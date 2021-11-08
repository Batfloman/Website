import Color from "../../../../../templates/Color.js";
import GameElement from "../../../../../templates/GameElement.js";
import Ball from "./Ball.js";

export default class Paddle extends GameElement {
    
    constructor(x, y, isBot) {
        super();

        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 100;

        this.isBot = isBot == true;

        this.color = new Color(255, 255, 255);
    }

    update(dt) {
        if(!this.isBot) {
            
        } else {
            let balls = this.game.findObjects(Ball);
            let closestBall = balls[0];
            
            // TODO welcher ist der näheste Ball mit richtung zu mir
        }
    }

    render() {
        let canvas = this.game.getCanvas();
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = this.color.getRGBValue();

        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
}