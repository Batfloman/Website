import Formeln from "../Formeln.js";
import Input from "../input/Input.js";
import WorldObject from "./WorldObject.js";
export default class MoveableObject extends WorldObject {
    constructor(centerPos, hitBox, controles) {
        super(centerPos, hitBox);
        this.lockMovement = true;
        this.controles = new Map();
        if (!controles)
            throw new Error("no controles set!");
        this.controles = controles;
    }
    update(dt) {
        if (this.lockMovement)
            return;
        Input.getPressedKeys().forEach(key => {
            if (this.controles.has(key)) {
                let func = this.controles.get(key);
                if (func instanceof Function)
                    func();
            }
        });
    }
    move(direction, distance) {
        this.centerPos = Formeln.moveDirection(this.centerPos, direction, distance);
    }
}
