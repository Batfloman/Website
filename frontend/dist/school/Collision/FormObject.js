"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovableObject_1 = __importDefault(require("../../templates/assets/MovableObject"));
const Formeln_1 = __importDefault(require("../../templates/Formeln"));
const Input_1 = __importDefault(require("../../templates/input/Input"));
const SAT_1 = __importDefault(require("../../templates/physic/2d/collision/SAT"));
class FromObject extends MovableObject_1.default {
    constructor(centerPos, hitBox) {
        let controles = new Map();
        controles.set("w", (dt) => { this.move(0, 100 * dt / 1000); });
        controles.set("s", (dt) => { this.move(180, 100 * dt / 1000); });
        controles.set("a", (dt) => { this.move(-90, 100 * dt / 1000); });
        controles.set("d", (dt) => { this.move(90, 100 * dt / 1000); });
        controles.set("q", (dt) => { this.rotate(-90 * dt / 1000); });
        controles.set("e", (dt) => { this.rotate(90 * dt / 1000); });
        super(centerPos, hitBox, controles);
        this.standardColor = "black";
        this.kollisionColor = "white";
        this.selectedColor = "black";
        this.standardWidth = 2;
        this.degPerSec = FromObject.randomSpeed(30, 180);
        Input_1.default.newEventListener("click", this, (event) => {
            let mPos = this.canvas.getMousePosWithViewOffSet();
            if (Formeln_1.default.distance(this.centerPos, mPos) < 10)
                this.lockMovement = !this.lockMovement;
        });
    }
    static randomSpeed(min, max) {
        let value;
        do {
            value = Math.random() * max * 2 - max;
        } while (value > -min && value < min);
        return value;
    }
    update(dt) {
        super.update(dt);
        this.rotate(this.degPerSec * dt / 1000);
    }
    testOverlap(objects) {
        for (let i = 0; i < objects.length; i++) {
            let overlap = (SAT_1.default.potentialCollision(this, objects[i]) && SAT_1.default.testCollision(this, objects[i]));
            if (overlap)
                return true;
        }
        return false;
    }
}
exports.default = FromObject;
