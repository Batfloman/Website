import WorldObject from "./WorldObject.js";
export class UIObject extends WorldObject {
    constructor(pos, hitBox, angle) {
        super(pos, hitBox, angle);
        this.zIndex = 10;
    }
    shouldRender() {
        return true;
    }
}
