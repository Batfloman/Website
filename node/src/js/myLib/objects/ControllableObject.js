import { Input } from "../input/Input.js";
import { WorldObject } from "./WorldObject.js";
export class ControllableObject extends WorldObject {
    controls = new Map();
    update(dt) {
        const keys = Array.from(this.controls.keys());
        keys.forEach((key) => {
            if (!Input.isPressed(key))
                return;
            this.controls.get(key)?.forEach((action) => action.perform(dt));
        });
        // normal update
        this.update2(dt);
    }
    addControll(key, func, cooldownTime = 0) {
        const control = new Action(func, cooldownTime);
        const array = this.controls.get(key) ?? [];
        array.push(control);
        this.controls.set(key, array);
    }
}
class Action {
    func;
    cooldown;
    elapsedTime = 0;
    constructor(func, cooldownTime = 0) {
        this.func = func;
        this.cooldown = cooldownTime;
    }
    perform(dt) {
        if ((this.elapsedTime += dt) > this.cooldown) {
            this.func(dt);
        }
    }
}
