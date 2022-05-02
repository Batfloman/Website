import { SceneObject } from "../assets/SceneObject.js";
import Rectangle from "../2d/boundingBox/Rectangle.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
import Polygon2Helper from "../2d/collision/Polygon2Helper.js";
export default class Scene {
    constructor(canvas, ...objects) {
        this.canvas = canvas;
        this.objects = objects;
        this.camara = new Camara(canvas);
        this.hitBox = new Rectangle(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
        this.pos = new Vector2(0, 0);
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
            if (exclude instanceof SceneObject && exclude == obj)
                return;
            if (obj instanceof clas) {
                found.push(obj);
            }
        });
        return found;
    }
    touches(obj) {
        throw new Error("Method not implemented.");
    }
    translatePoints() {
        return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.angle);
    }
    update(dt) {
        this.objects.forEach(obj => {
            obj.update(dt);
        });
    }
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
