import { GameObject } from "./GameObject.js";
import { Input } from "../input/Input.js";
export class ControllableObject extends GameObject {
    controlles = new Map();
    timeOuts = new Map();
    update(dt) {
        for (let key of Array.from(this.controlles.keys())) {
            const timeout = this.timeOuts.get(key);
            if (!timeout)
                throw new Error("Timeout not defined for key " + key);
            timeout.timeElapsed += dt;
            if (timeout.timeElapsed < timeout.timeOut)
                return;
            if (!Input.isPressed(key))
                return;
            timeout.timeElapsed = 0;
            const func = this.controlles.get(key);
            if (!func)
                throw new Error("Function not definded for key " + key);
            func.call(this, dt);
        }
        // normal update
        this.update2(dt);
    }
    addControll(key, func, timeout = 0) {
        this.controlles.set(key, func);
        this.timeOuts.set(key, {
            timeOut: timeout,
            timeElapsed: 0,
        });
    }
}
