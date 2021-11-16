import Color from "../../../../../templates/util/Color.js";
import GameObject from "../../../../../templates/gameAssets/GameObject.js";
import Vector2f from "../../../../../templates/util/Vector2f.js";

export default class Ball extends GameObject {
    static startSpeed = 250;
    static minOrientation = 33;
    static radius = 10;

    startX;
    startY;

    orientation;
    speed;

    constructor(x, y) {
        super();

        this.startX = x;
        this.startY = y;
        this.color = Color.get("white");

        this.reset();
    }

    update(dt) { 
        if(this.pos.x < 0 || this.pos.y > this.canvas.height) {
            this.bounce();
        };
        if(this.x < 0 || this.x > this.canvas.width) this.reset();
        
        let moveX = Math.sin(this.orientation * (Math.PI/180)) * dt * this.speed / 1000;
        let moveY = -Math.cos(this.orientation * (Math.PI/180)) * dt * this.speed / 1000;
        
        this.x += moveX;
        this.y += moveY;
    }

    render() {
        let canvas = this.game.getCanvas();
        let ctx = canvas.getContext("2d");
        
        ctx.fillStyle = this.color.getRGB();
        ctx.strokeStyle = this.color.getRGB();
        
        ctx.beginPath();

        ctx.arc(this.x, this.y, Ball.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    reset() {
        this.pos = new Vector2f(this.startX, this.startY);

        this.speed = Ball.startSpeed;
        this.orientation = this.getRandomOrientation();
    }

    overlapsPoint(point) {

    }

    getRandomOrientation() {
        let min = Ball.minOrientation + (180 * Math.round( Math.random()));
        let random = Math.floor( Math.random()* (180 - 2 * Ball.minOrientation));
        return min + random;
    }

    bounce() {
        // if()
    }

    get x() { return this.pos.x;}
    get y() { return this.pos.y;}

    set x(x) { this.pos.x = x;}
    set y(y) { this.pos.y = y;}
}