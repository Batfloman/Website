"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_js_1 = require("../assets/SceneObject.js");
const Rectangle_js_1 = __importDefault(require("../2d/boundingBox/Rectangle.js"));
const Vector2_js_1 = __importDefault(require("../util/Vector2.js"));
const Camara_js_1 = __importDefault(require("./Camara.js"));
const Polygon2Helper_js_1 = __importDefault(require("../2d/collision/Polygon2Helper.js"));
class Scene {
    constructor(canvas, ...objects) {
        this.canvas = canvas;
        this.objects = objects;
        this.camara = new Camara_js_1.default(canvas);
        this.hitBox = new Rectangle_js_1.default(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
        this.pos = new Vector2_js_1.default(0, 0);
        this.angle = 0;
        this.points = this.translatePoints();
    }
    addObject(obj) {
        if (this.objects.includes(obj))
            return;
        this.objects.push(obj);
    }
    removeObject(obj) {
        if (!this.objects.includes(obj))
            return null;
        return this.objects.splice(this.objects.indexOf(obj), 1)[0];
    }
    findObjects(clas, exclude) {
        let found = new Array();
        this.objects.forEach(obj => {
            if (exclude instanceof Array && exclude.includes(obj))
                return;
            if (exclude instanceof SceneObject_js_1.SceneObject && exclude == obj)
                return;
            if (obj instanceof clas) {
                found.push(obj);
            }
        });
        return found;
    }
    // ICollideable
    touches(obj) {
        throw new Error("Method not implemented.");
    }
    translatePoints() {
        return Polygon2Helper_js_1.default.translatePoints(this.hitBox.model, this.pos, this.angle);
    }
    // IUpdateable
    update(dt) {
        this.objects.forEach(obj => {
            obj.update(dt);
        });
    }
    // IRenderable
    render(ctx) {
        this.objects.sort((a, b) => {
            return (a.zIndex > b.zIndex) ? 1 : -1;
        });
        this.objects.forEach(obj => {
            if (obj.shouldRender()) {
                obj.render(ctx);
            }
        });
    }
    shouldRender() {
        return true;
    }
}
exports.default = Scene;
