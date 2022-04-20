import Camara from "../display/Camara.js";
export class SceneObject {
    constructor() {
        this.zIndex = 0;
    }
    init(system) {
        this.system = system;
    }
    getCamara() {
        return this.system.activeScene == undefined ? new Camara(this.system.canvas) : this.system.activeScene.camara;
    }
}
