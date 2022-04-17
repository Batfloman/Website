import Color from "../util/Color.js";
import Paddle from "./Paddle.js";
import Vector2f from "../util/Vector2f.js";

export default class Ball {
    static startSpeed = 250;
    static minOrientation = 33;
    static radius = 10;

    startPos;
    pos;
    color;

    orientation;
    speed;

    constructor(x, y) {
        this.pos = new Vector2f(x, y);
        this.startPos = new Vector2f(x, y);
        this.color = Color.get("white");

        this.reset();
    }

    update(dt) { 
        super.update(dt);

        if(this.touches("bottom") || this.touches("top") || this.touches(Paddle)) this.bounce();
        if(this.touches("left") || this.touches("right")) this.reset();
    }

    render() {
        let ctx = this.canvas.getContext("2d");
        
        ctx.fillStyle = this.color.getRGB();
        ctx.strokeStyle = this.color.getRGB();
        
        ctx.beginPath();

        ctx.arc(this.pos.x, this.pos.y, Ball.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    reset() {
        this.pos = new Vector2f(this.startX, this.startY);
        this.orientation = this.getRandomOrientation();
        this.speed = Ball.startSpeed;
    }

    touches(objClass) {
        if(typeof objClass == "string") {
            if(objClass == "bottom") return this.pos.y + Ball.radius >= this.canvas.height;
            else if(objClass == "top") return this.pos.y - Ball.radius <= 0;
            else if(objClass == "left") return this.pos.x - Ball.radius <= 0;
            else if(objClass == "right") return this.pos.x + Ball.radius >= this.canvas.width;

            return false;
        }

        let objects = this.game.findObjects(objClass);
        if(!objects) return;
        
        objects.forEach(obj => {
            // console.log(obj);
        });
    }

    getRandomOrientation() {
        let min = Ball.minOrientation + (180 * Math.round( Math.random()));
        let random = Math.floor( Math.random()* (180 - 2 * Ball.minOrientation));
        return min + random;
    }

    bounce() {
        
    }
}