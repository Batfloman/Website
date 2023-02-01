import { Input } from "../input/Input.js";
import { WorldObject } from "./WorldObject.js";
export class ControllableObject extends WorldObject {
    controls = new Map();
    update(dt) {
        this.controls.forEach((actions, key) => {
            if (!Input.isPressed(key))
                return;
            actions.forEach((action) => {
                if (action.isReady(dt)) {
                    action.perform(dt);
                }
            });
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
    isReady(dt) {
        return (this.elapsedTime += dt) > this.cooldown;
    }
    perform(dt) {
        this.func(dt);
        this.elapsedTime = 0;
    }
}
