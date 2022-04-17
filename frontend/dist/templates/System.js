"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_1 = __importDefault(require("./display/Canvas"));
class System {
    constructor(canvas) {
        this.objects = new Array();
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (!(canvas instanceof Canvas_1.default))
            throw new Error(canvas + " is not instanceof Canvas!");
        this.canvas = canvas;
    }
    addObject(obj) {
        if (this.objects.includes(obj))
            return;
        this.objects.push(obj);
        obj.init(this.canvas, this);
    }
    removeObject(obj) {
        if (!(this.objects.includes(obj))) {
            console.warn(`${obj} is not there!`);
            return;
        }
        let index = this.objects.indexOf(obj);
        return this.objects.splice(index, 1)[0];
    }
    findObjects(t) {
        return t;
    }
    start() {
        this.interval = setInterval(() => {
            this.tick();
        }, 10);
    }
    stop() {
        clearInterval(this.interval);
    }
    tick() {
        if (!this.timeLast)
            this.timeLast = Date.now();
        let timeNow = Date.now();
        let dt = timeNow - this.timeLast;
        this.timeLast = timeNow;
        this.objects.forEach(obj => {
            obj.update(dt);
        });
        this.objects.sort((a, b) => (a.zIndex > b.zIndex) ? 1 : -1);
        this.canvas.render(this.objects);
    }
}
exports.default = System;
