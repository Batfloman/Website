var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Camara from "../display/Camara.js";
import Renderer from "../display/Renderer.js";
import Input from "../input/Input.js";
import World from "../assets/worlds/World.js";
import Util from "../util/Util.js";
export default class Game {
    constructor(canvas) {
        this.isStopped = true;
        this.stoppedBecauseBlur = false;
        this.timeElapsedBeforeStop = 0;
        this.maxUpdateDistance = Infinity;
        this.deleteDistance = Infinity;
        this.worlds = new Map();
        this.lastTickTime = Date.now();
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
        Game.gameLoop(this);
    }
    static gameLoop(game) {
        game.tick();
        window.requestAnimationFrame(() => {
            Game.gameLoop(game);
        });
    }
    tick() {
        this.updateObjects();
        this.renderObjects();
    }
    updateObjects() {
        return __awaiter(this, void 0, void 0, function* () {
            let dt = this.calc_dt();
            this.lastTickTime = Date.now();
            if (this.isStopped)
                dt = 0;
            const worlds = Array.from(this.worlds.values());
            for (let world of Util.array.copyOf(worlds)) {
                world.putObjectsInCunks();
                for (let obj of world.objects) {
                    if (obj.shouldUpdate())
                        obj.update(dt);
                }
            }
        });
    }
    renderObjects() {
        return __awaiter(this, void 0, void 0, function* () {
            this.renderer.clear();
            const worlds = Array.from(this.worlds.values());
            for (let world of worlds) {
                world.objects.sort((a, b) => (a.zIndex <= b.zIndex ? -1 : 1));
                world.render(this.renderer);
            }
            for (let world of worlds) {
                for (let obj of world.objects) {
                    if (obj.shouldRender())
                        obj.render(this.renderer);
                }
            }
        });
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
        const worlds = Array.from(this.worlds.values());
        for (let world of worlds) {
            found = found.concat(world.findObjects(clas.name, exclude));
        }
        return Util.array.copyOf(found);
    }
    addWorld(name, world) {
        this.worlds.set(name, world);
    }
    getWorld(name = "main") {
        return this.worlds.get(name);
    }
    setWorldBackground(color, name = "main") {
        const map = this.worlds.get(name);
        if (map)
            map.setBackground(color);
    }
    setWorldChunkSize(size, name = "main") {
        const map = this.worlds.get(name);
        if (map)
            map.setChunkSize(size);
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
        this.camara.setLockScaling(b);
    }
    setCamaraMovementLock(b) {
        this.camara.setLockMovement(b);
    }
    setMaxUpdateDistance(distance) {
        this.maxUpdateDistance = distance;
    }
    setMaxDeleteDistance(distance) {
        this.deleteDistance = distance;
    }
}
