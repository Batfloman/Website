import Input from "../../input/Input.js";
import { WorldObject } from "./WorldObject.js";
export class ControllableObject extends WorldObject {
    constructor() {
        super(...arguments);
        this.controlles = new Map();
    }
    update(dt) {
        this.controlles.forEach((value, key) => {
            if (Input.isPressed(key)) {
                value.call(this, dt);
            }
        });
        this.update2(dt);
    }
}
