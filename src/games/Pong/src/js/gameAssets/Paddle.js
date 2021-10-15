export default class Paddel {
    canvas;
    width = 0;
    height = 0;
    x = 0;
    y = 0;

    constructor(x, y) {
        if(x > 0) this.x = x;
        if(y > 0) this.y = y;
    }

    init(canvas) {
        this.canvas = canvas;
        this.width = canvas.getBoundingClientRect().width / 50;
        this.height = canvas.getBoundingClientRect().height / 3;
    }

    render(ctx) {
        ctx.fillStyle = '#0ff';
        ctx.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    }
    
    update(dt) {
        if(dt > 0) this.y += 5/dt;
    }

    setY(y) {
        this.y = y;
    }
}