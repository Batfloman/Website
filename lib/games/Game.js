"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Camara_js_1 = require("../display/Camara.js");
const Renderer_js_1 = require("../display/Renderer.js");
const Input_js_1 = require("../input/Input.js");
const World_js_1 = require("../assets/worlds/World.js");
const Util_js_1 = require("../util/Util.js");
const Vector2_js_1 = require("../util/Vector2.js");
const maxDTPerTick = 75;
class Game {
    constructor(canvas) {
        // time
        this.isStopped = true;
        this.stoppedBecauseBlur = false;
        this.timeElapsedBeforeStop = 0;
        // #endregion
        // ==========================================================================================
        // #region worlds
        this.worlds = new Map();
        //#endregion
        // ==========================================================================================
        // #region time
        this.lastTickTime = Date.now();
        this.canvas = canvas;
        this.camara = new Camara_js_1.Camara(this.canvas);
        this.renderer = new Renderer_js_1.Renderer(this.canvas, this.camara);
        this.setWorld("main", new World_js_1.World());
        Input_js_1.Input.newEventListener("blur", this, () => {
            if (!this.isStopped) {
                this.stop();
                this.stoppedBecauseBlur = true;
            }
        });
        Input_js_1.Input.newEventListener("focus", this, () => {
            if (this.stoppedBecauseBlur)
                this.start();
        });
        Input_js_1.Input.newEventListener("resize", this, this.renderObjects);
        Input_js_1.Input.newEventListener("mouseup", this, this.registerClick);
        Input_js_1.Input.newEventListener("touchcancel", this, this.registerClick);
        Input_js_1.Input.newEventListener("touchend", this, this.registerClick);
        // start loop
        Game.gameLoop(this);
    }
    registerClick(event) {
        const canvasClicked = Array.from(event.composedPath()).includes(this.canvas.htmlCanvas);
        if (!canvasClicked)
            return;
        const clickPos = event instanceof TouchEvent
            ? Game.getRelativeTouchPos(event)
            : new Vector2_js_1.Vector2(event.offsetX, event.offsetY);
        const worldPos = Util_js_1.Util.position.staticPos_to_worldPos(clickPos, this.camara);
        for (let world of Array.from(this.worlds.values())) {
            if (!world.isInsideWorld(worldPos))
                continue;
            world.clicked(worldPos);
        }
    }
    static getRelativeTouchPos(event) {
        const touch = event.touches[0] || event.changedTouches[0];
        const clientPos = new Vector2_js_1.Vector2(touch.clientX, touch.clientY);
        const target = touch.target;
        // why there errors??? works just fine!
        const targetOffset = new Vector2_js_1.Vector2(touch.target.offsetLeft, touch.target.offsetTop);
        // why there errors??? works just fine!
        const topLeft = targetOffset.subtract(new Vector2_js_1.Vector2(touch.target.width / 2, touch.target.height / 2));
        return clientPos.subtract(topLeft);
    }
    // ==========================================================================================
    //#region game Tick
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
            // max dt
            if (dt > maxDTPerTick)
                dt = maxDTPerTick;
            // update
            const worlds = Array.from(this.worlds.values());
            for (let world of Util_js_1.Util.array.copyOf(worlds)) {
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
    //#endregion
    // ==========================================================================================
    // #region objects
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
        return Util_js_1.Util.array.copyOf(found);
    }
    setWorld(name, world) {
        this.worlds.set(name, world);
        world.init(this);
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
    //#endregion
    // ==========================================================================================
    // #region getter & setter
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
}
exports.Game = Game;
