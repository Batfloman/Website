import { GameObject } from "./GameObject.js";
import { Input } from "../input/Input.js";

export abstract class ControllableObject extends GameObject {
  private controlles: Map<inputKey, Function> = new Map();
  private keyTimeOuts: Map<inputKey, { timeOut: number; timeElapsed: number }> = new Map();

  update(dt: number): void {
    const keys = Array.from(this.controlles.keys());

    keys.forEach(key => {
      const timeout = this.keyTimeOuts.get(key);
      if (!timeout) throw new Error("Timeout not defined for key " + key);

      timeout.timeElapsed += dt;

      if (timeout.timeElapsed < timeout.timeOut) return;
      if (!Input.isPressed(key)) return;

      timeout.timeElapsed -= timeout.timeOut;

      const func = this.controlles.get(key);

      if (!func) throw new Error("Function not definded for key " + key);
      func.call(this, dt);
    })

    // normal update
    this.update2(dt);
  }

  abstract update2(dt: number): void;

  addControll(key: inputKey, func: Function, timeout: number = 0) {
    this.controlles.set(key, func);
    this.keyTimeOuts.set(key, {
      timeOut: timeout,
      timeElapsed: 0,
    });
  }
}
