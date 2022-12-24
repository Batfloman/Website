import { SystemObject } from "./SystemObject";
export class GameObject extends SystemObject {
    geometry;
    constructor(geometry) {
        super();
        this.geometry = geometry;
    }
    update(dt) {
        throw new Error("Method not implemented.");
    }
    render() {
        throw new Error("Method not implemented.");
    }
    shouldUpdate() {
        throw new Error("Method not implemented.");
    }
    shouldRender() {
        throw new Error("Method not implemented.");
    }
}
