import Color from "../../../../../templates/util/Color.js";
import MoveableObject from "../../../../../templates/gameAssets/impl/MoveableObject.js";
import Vector2f from "../../../../../templates/util/Vector2f.js";
import Paddle from "./Paddle.js";

export default class Ball extends MoveableObject {
    static startSpeed = 250;
    static minOrientation = 33;
    static radius = 10;

    startX;
    startY;

    constructor(x, y) {
        super();

        this.startX = x;
        this.startY = y;
        this.color = Color.get("white");

        this.reset();
    }

    update(dt) { 
        super.update(dt);

        console.log(this.getDirection())

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

        this.setMove(this.getRandomOrientation(), Ball.startSpeed);
    }

    overlapsPoint(point) {

    }

    touches(objClass) {
        if(typeof objClass == "string") {
            if(objClass == "bottom") isTouching = this.pos.y + Ball.radius >= this.canvas.height;
            else if(objClass == "top") isTouching = this.pos.y - Ball.radius <= 0;
            else if(objClass == "left") isTouching = this.pos.x - Ball.radius <= 0;
            else if(objClass == "right") isTouching = this.pos.x + Ball.radius >= this.canvas.width;

            return isTouching;
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