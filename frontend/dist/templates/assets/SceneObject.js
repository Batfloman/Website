"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SceneObject {
    constructor() {
        this.zIndex = 0;
    }
    init(canvas, system) {
        this.canvas = canvas;
        this.system = system;
    }
    update(dt) { }
    ;
    render(ctx) { }
    ;
    notify(event) {
        console.log(event);
    }
}
exports.default = SceneObject;
