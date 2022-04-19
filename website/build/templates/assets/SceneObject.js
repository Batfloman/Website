export class SceneObject {
    constructor() {
        this.zIndex = 0;
    }
    init(canvas, system) {
        this.canvas = canvas;
        this.system = system;
    }
}
