import { SystemObject } from "./SystemObject.js";
export class GameObject extends SystemObject {
    mesh;
    constructor(mesh) {
        super();
        this.mesh = mesh;
    }
    update(dt) {
        throw new Error("Method not implemented.");
    }
}
