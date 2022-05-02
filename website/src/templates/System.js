"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_js_1 = __importDefault(require("./display/Canvas.js"));
const Scene_js_1 = __importDefault(require("./display/Scene.js"));
class System {
    constructor(canvas) {
        this.scenes = new Map();
        // if user is on moblie 
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (!(canvas instanceof Canvas_js_1.default))
            throw new Error(canvas + " is not instanceof Canvas!");
        this.canvas = canvas;
        this.scenes.set("main", new Scene_js_1.default(canvas));
        this.activeScene = this.scenes.get("main");
    }
    addObject(obj) {
        if (!this.activeScene)
            return;
        this.activeScene.addObject(obj);
        obj.init(this);
    }
    removeObject(obj) {
        if (!this.activeScene)
            return null;
        return this.activeScene.removeObject(obj);
    }
    findObjects(clas, exclude) {
        if (!this.activeScene)
            return null;
        return this.activeScene.findObjects(clas, exclude);
    }
    addScene(scene, name) {
        this.scenes.set(name == undefined ? "scene" + this.scenes.size : name, scene);
    }
    activateScene(name) {
        let scene = this.scenes.get(name);
        if (scene != null)
            this.activeScene = scene;
    }
    start() {
        this.interval = setInterval(() => {
            this.tick();
        }, 25);
    }
    stop() {
        clearInterval(this.interval);
    }
    tick() {
        var _a, _b;
        if (!this.timeLast)
            this.timeLast = Date.now();
        let timeNow = Date.now();
        let dt = timeNow - this.timeLast;
        this.timeLast = timeNow;
        (_a = this.activeScene) === null || _a === void 0 ? void 0 : _a.update(dt);
        let ctx = this.canvas.htmlCanvas.getContext("2d");
        if (!!ctx) {
            ctx.clearRect(0, 0, this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
            (_b = this.activeScene) === null || _b === void 0 ? void 0 : _b.render(ctx);
        }
    }
}
exports.default = System;
