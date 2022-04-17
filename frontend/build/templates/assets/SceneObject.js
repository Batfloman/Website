export default class SceneObject {
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
