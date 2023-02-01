import { Input } from "../input/Input.js";
import { WorldObject } from "./WorldObject.js";

export abstract class ControllableObject extends WorldObject {
  private controls: Map<inputKey, Action[]> = new Map();

  update(dt: number): void {
    this.controls.forEach((actions, key) => {
      if (!Input.isPressed(key)) return;

      actions.forEach((action) => {
        if (action.isReady(dt)) {
          action.perform(dt);
        }
      });
    });

    // normal update
    this.update2(dt);
  }

  abstract update2(dt: number): void;

  addControll(key: inputKey, func: Function, cooldownTime: number = 0) {
    const control = new Action(func, cooldownTime);

    const array = this.controls.get(key) ?? [];
    array.push(control);
    this.controls.set(key, array);
  }
}

class Action {
  private func: Function;
  private cooldown: number;
  private elapsedTime: number = 0;

  constructor(func: Function, cooldownTime: number = 0) {
    this.func = func;
    this.cooldown = cooldownTime;
  }

  isReady(dt: number) {
    return (this.elapsedTime += dt) > this.cooldown;
  }

  perform(dt: number) {
    this.func(dt);
    this.elapsedTime = 0;
  }
}
