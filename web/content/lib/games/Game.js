import Camara from "../display/Camara.js";
import Renderer from "../display/Renderer.js";
import Input from "../input/Input.js";
import World from "../assets/Worlds/World.js";
export default class Game {
    constructor(canvas) {
        this.worlds = new Map();
        this.isStopped = true;
        this.stoppedBecauseBlur = false;
        this.timeElapsedBeforeStop = 0;
        this.lastTickTime = Date.now();
        this.maxUpdateDistance = 2000;
        this.deleteDistance = 10000;
        this.logTickTime = false;
        this.logDT = false;
        this.canvas = canvas;
        this.camara = new Camara(this.canvas);
        this.renderer = new Renderer(this.canvas, this.camara);
        this.addWorld("main", new World());
        Input.newEventListener("blur", this, () => {
            if (!this.isStopped) {
                this.stop();
                this.stoppedBecauseBlur = true;
            }
        });
        Input.newEventListener("focus", this, () => {
            if (this.stoppedBecauseBlur)
                this.start();
        });
        Input.newEventListener("resize", this, this.renderObjects);
        Game.testTick(this);
    }
    static testTick(game) {
        if (!game.isStopped)
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
        if (this.logTickTime)
            console.log("update", timeToUpdate, "render", timeToRender);
    }
    updateObjects() {
        let dt = this.calc_dt();
        this.lastTickTime = Date.now();
        if (this.logDT)
            console.log(dt);
        for (let world of Array.from(this.worlds.values())) {
            for (let obj of world.objects) {
                if (obj.shouldUpdate())
                    obj.update(dt);
            }
        }
    }
    renderObjects() {
        this.renderer.clear();
        console.log("test");
        for (let world of Array.from(this.worlds.values())) {
            world.objects.sort((a, b) => (a.zIndex <= b.zIndex ? -1 : 1));
            world.render(this.renderer);
            for (let obj of world.objects) {
                if (obj.shouldRender())
                    obj.render(this.renderer);
            }
        }
    }
    addObject(obj, worldName = "main") {
        const world = this.worlds.get(worldName);
        if (!world)
            throw new Error(`${worldName} is no World!`);
        world.addObject(obj);
        obj.init(this, this.canvas);
    }
    removeObject(obj, worldName = "main") {
        const world = this.worlds.get(worldName);
        if (!world)
            throw new Error(`${worldName} is no World`);
        return world.removeObject(obj);
    }
    findObjects(clas, exclude) {
        let found = [];
        for (let world of Array.from(this.worlds.values())) {
            found = found.concat(world.findObjects(clas.name, exclude));
        }
        return found;
    }
    addWorld(name, world) {
        this.worlds.set(name, world);
    }
    getWorld(name) {
        return this.worlds.get(name);
    }
    calc_dt() {
        return Date.now() - this.lastTickTime;
    }
    start() {
        if (!this.isStopped)
            return;
        this.lastTickTime = Date.now() - this.timeElapsedBeforeStop;
        this.isStopped = false;
    }
    stop() {
        if (this.isStopped)
            return;
        this.timeElapsedBeforeStop = Date.now() - this.lastTickTime;
        this.isStopped = true;
    }
    setLogTickTime(b) {
        this.logTickTime = b;
    }
    setLogDT(b) {
        this.logDT = b;
    }
    getCamara() {
        return this.camara;
    }
    getRenderer() {
        return this.renderer;
    }
    getCanvas() {
        return this.canvas;
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
