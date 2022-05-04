import { WorldObject } from "./WorldObject.js";
export class ControllableObject extends WorldObject {
    constructor(pos, hitBox, angle) {
        super(pos, hitBox, angle);
        this.controlles = new Map();
    }
    update(dt) {
        this.controlles.forEach((value, key) => {
            console.log(value, key);
        });
    }
}
