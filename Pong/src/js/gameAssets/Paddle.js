import Color from "../../../../static/Color.js";
import GameElement from "../../../../static/GameElement.js";

export default class Paddle extends GameElement {
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;
        this.h = 80; 
        this.w = 20;
        this.color = new Color(255, 255, 255);
    }

    render() {
        let ctx = this.canvas.getContext("2d");

        ctx.fillStyle = this.color.getRGBValue();

        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
}