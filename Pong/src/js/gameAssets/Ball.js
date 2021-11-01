import Color from "../../../../static/Color.js";
import GameElement from "../../../../static/GameElement.js";

export default class Ball extends GameElement {
    rotation;
    
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.color = new Color(255, 255, 255);
        this.rotation = Math.floor(Math.random()*4) * 90 + 45;
    }

    update(dt) { 
        let moveX = Math.sin(this.rotation * (Math.PI/180)) * dt * .5;
        let moveY = -Math.cos(this.rotation * (Math.PI/180)) * dt * .5;

        this.x += moveX;
        this.y += moveY;
    }

    render() {
        let ctx = this.canvas.getContext("2d");
        
        ctx.fillStyle = this.color.getRGBValue();
        ctx.strokeStyle = this.color.getRGBValue();
        
        ctx.beginPath();

        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}