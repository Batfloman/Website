"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllableObject = void 0;
const Input_js_1 = require("../../input/Input.js");
const WorldObject_js_1 = require("./WorldObject.js");
class ControllableObject extends WorldObject_js_1.WorldObject {
    constructor() {
        super(...arguments);
        this.controlles = new Map();
        this.timeOuts = new Map();
    }
    update(dt) {
        for (let key of Array.from(this.controlles.keys())) {
            const timeout = this.timeOuts.get(key);
            if (!timeout)
                throw new Error("Timeout not defined for key " + key);
            timeout.timeElapsed += dt;
            if (timeout.timeElapsed >= timeout.timeOut) {
                if (Input_js_1.Input.isPressed(key)) {
                    timeout.timeElapsed = 0;
                    const func = this.controlles.get(key);
                    if (!func)
                        throw new Error("Function not definded for key " + key);
                    func.call(this, dt);
                }
            }
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
exports.ControllableObject = ControllableObject;
