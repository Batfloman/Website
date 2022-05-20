import Camara from "../display/Camara.js";
import Renderer from "../display/Renderer.js";
import Input from "../input/Input.js";
export class Game {
    constructor(canvas) {
        this.paused = true;
        this.pausedBecauseBlur = false;
        this.timeElapsedBeforePause = 0;
        this.lastTime = Date.now();
        this.maxUpdateDistance = 2000;
        this.deleteDistance = 10000;
        this.canvas = canvas;
        this.objects = [];
        this.camara = new Camara(this.canvas);
        this.renderer = new Renderer(this.canvas, this.camara);
        Input.newEventListener("blur", this, () => {
            if (!this.paused) {
                this.stop();
                this.pausedBecauseBlur = true;
            }
        });
        Input.newEventListener("focus", this, () => {
            if (this.pausedBecauseBlur)
                this.start();
        });
        Input.newEventListener("resize", this, this.renderObjects);
        Game.testTick(this);
    }
    static testTick(game) {
        if (!game.paused)
            game.tick();
        window.requestAnimationFrame(() => {
            Game.testTick(game);
        });
    }
    tick() {
        let before = Date.now();
        this.updateObjects();
        const timeToUpdate = Date.now() - before;
        before = Date.now();
        this.renderObjects();
        const timeToRender = Date.now() - before;
    }
    updateObjects() {
        let dt = this.calc_dt();
        this.lastTime = Date.now();
        this.objects.forEach((obj) => {
            if (obj.shouldUpdate())
                obj.update(dt);
        });
    }
    renderObjects() {
        let renderer = new Renderer(this.canvas, this.camara);
        renderer.clear();
        this.objects.sort((a, b) => (a.zIndex <= b.zIndex ? -1 : 1));
        this.objects.forEach((obj) => {
            if (obj.shouldRender())
                obj.render(renderer);
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
    calc_dt() {
        return Date.now() - this.lastTime;
    }
    start() {
        if (!this.paused)
            return;
        this.lastTime = Date.now() - this.timeElapsedBeforePause;
        this.paused = false;
    }
    stop() {
        if (this.paused)
            return;
        this.timeElapsedBeforePause = Date.now() - this.lastTime;
        this.paused = true;
    }
    getCamara() {
        return this.camara;
    }
    getRenderer() {
        return this.renderer;
    }
    setCamaraScaleLock(b) {
        this.camara.lockScaling = b;
    }
    setCamaraMovementLock(b) {
        this.camara.lockMovement = b;
    }
    setMaxUpdateDistance(distance) {
        this.maxUpdateDistance = distance;
    }
    setMaxDeleteDistance(distance) {
        this.deleteDistance = distance;
    }
}
