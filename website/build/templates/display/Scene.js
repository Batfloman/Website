import { SceneObject } from "../assets/SceneObject.js";
import Rectangle from "../physic/2d/boundingBox/Rectangle.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
export default class Scene {
    constructor(canvas, ...objects) {
        this.canvas = canvas;
        this.objects = objects;
        this.camara = new Camara(canvas);
        this.hitBox = new Rectangle(canvas.htmlCanvas.width, canvas.htmlCanvas.height);
        this.pos = new Vector2(0, 0);
    }
    touches(obj) {
        throw new Error("Method not implemented.");
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
            if (obj instanceof SceneObject && obj.shouldRender()) {
                obj.render(ctx);
            }
        });
    }
    shouldRender() {
        return true;
    }
}
