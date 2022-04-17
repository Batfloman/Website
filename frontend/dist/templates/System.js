"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __importDefault(require("./assets/SceneObject"));
const Canvas_1 = __importDefault(require("./display/Canvas"));
class System {
    constructor(canvas) {
        /** @type {SceneObject[]} */
        this.objects = new Array();
        // if user is on moblie 
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
    findObjects(clas, exclude) {
        if (!clas)
            throw new Error(clas + " is not valid as class");
        let foundObjects = new Array();
        this.objects.forEach(obj => {
            if (exclude instanceof SceneObject_1.default && obj == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(obj))
                return;
            if (obj instanceof clas) {
                foundObjects.push(obj);
            }
        });
        return foundObjects;
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
