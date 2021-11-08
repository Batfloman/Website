import Color from "../../../../../templates/Color.js";
import GameElement from "../../../../../templates/GameElement.js";

export default class Ball extends GameElement {
    startX;
    startY;
    
    x;
    y;

    speedX = 0;
    speedY = 0;

    constructor(x, y) {
        super();

        this.startX = x;
        this.startY = y;

        this.color = new Color(255, 255, 255);

        this.reset();
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;

        this.speedX = Math.round(Math.random()) == 1 ? -Math.ceil( Math.random() * 2) - 2 : Math.ceil( Math.random() * 2) + 2;
        this.speedY = Math.round(Math.random()) == 1 ? -Math.ceil( Math.random() * 2) : Math.ceil( Math.random() * 2);
    }

    update(dt) { 
        if(this.y < 0 || this.y > this.game.getCanvas().height) this.speedY = -this.speedY;
        if(this.x < 0 || this.x > this.game.getCanvas().width) this.reset();
        
        let moveX = this.speedX / dt * 10;
        let moveY = this.speedY / dt * 10;
        
        this.x += moveX;
        this.y += moveY;
    }

    render() {
        let canvas = this.game.getCanvas();
        let ctx = canvas.getContext("2d");
        
        ctx.fillStyle = this.color.getRGBValue();
        ctx.strokeStyle = this.color.getRGBValue();
        
        ctx.beginPath();

        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    get x() { return this.x;}
    get y() { return this.y;}

    set x(x) { this.x = x;}
    set y(y) { this.y = y;}
}