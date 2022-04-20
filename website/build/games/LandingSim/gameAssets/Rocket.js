import GameObject from "./GameObject.js";
const startHeight = 10000;
const accelerationSpeed = 10;
export default class Rocket extends GameObject {
    constructor() {
        super();
        this.fuel = 0;
        this.fallSpeed = 0;
        this.height = 0;
        this.thrusterOn = false;
        this.symbol = "\u25EE";
        this.pos = {
            x: 0,
            y: 0,
        };
        this.height = startHeight;
    }
    update(dt) {
        let marginTop = this.canvas.height * 0.15;
        let marginBottom = this.canvas.height * 0.03;
        let y = (-(100 / startHeight) * this.height + 100) / 100;
        this.pos = {
            x: this.canvas.width / 2,
            y: marginTop + y * (this.canvas.height - (marginBottom + marginTop))
        };
        this.fallSpeed += this.thrusterOn ? -((accelerationSpeed * dt) / 500) : ((accelerationSpeed * dt) / 500);
        this.height -= this.fallSpeed;
    }
    render() {
        if (this.canvas == null | undefined)
            return;
        let ctx = this.canvas.getContext("2d");
        ctx.font = Math.max(this.canvas.width, this.canvas.height) / 15 + "px serif";
        ctx.textAlign = "center";
        ctx.fillText(this.symbol, this.pos.x, this.pos.y);
    }
    setThruster(boolean) {
        this.thrusterOn = boolean;
    }
}