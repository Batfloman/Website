import Input from "../input/Input.js";
export class Game {
    constructor(canvas) {
        this.paused = true;
        this.lastTime = Date.now();
        this.timeSinceLastTime = 0;
        this.canvas = canvas;
        this.objects = [];
        setInterval(Game.testTick, 10, this);
        Input.newEventListener("blur", this, () => {
            this.stop();
        });
        Input.newEventListener("focus", this, () => {
            this.start();
        });
    }
    addObject(obj) {
        if (this.objects.includes(obj))
            return;
        this.objects.push(obj);
        obj.init(this, this.canvas);
    }
    removeObject(obj) {
        if (!this.objects.includes(obj))
            return;
        let removed = this.objects.splice(this.objects.indexOf(obj), 1);
        return removed[0];
    }
    findObjects(clas, exclude) {
        let found = [];
        this.objects.forEach((obj) => {
            if (exclude instanceof Array && exclude.includes(obj))
                return;
            if (exclude instanceof Object && exclude == obj)
                return;
            if (obj instanceof clas) {
                found.push(obj);
            }
        });
        return found;
    }
    tick() {
        throw new Error("not Implmented!");
    }
    calc_dt() {
        return Date.now() - this.lastTime;
    }
    start() {
        if (this.paused) {
            this.lastTime = Date.now() - this.timeSinceLastTime;
            this.paused = false;
        }
    }
    stop() {
        if (!this.paused) {
            this.timeSinceLastTime = Date.now() - this.lastTime;
            this.paused = true;
        }
    }
    static testTick(game) {
        if (!game.paused) {
            game.tick();
            game.lastTime = Date.now();
        }
    }
}
