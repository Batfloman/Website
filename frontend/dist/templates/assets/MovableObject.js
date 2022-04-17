"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Formeln_1 = __importDefault(require("../Formeln"));
const Input_1 = __importDefault(require("../input/Input"));
const WorldObject_1 = __importDefault(require("./WorldObject"));
class MoveableObject extends WorldObject_1.default {
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
        Input_1.default.getPressedKeys().forEach(key => {
            if (this.controles.has(key)) {
                let func = this.controles.get(key);
                if (func instanceof Function)
                    func();
            }
        });
    }
    move(direction, distance) {
        this.centerPos = Formeln_1.default.moveDirection(this.centerPos, direction, distance);
    }
}
exports.default = MoveableObject;
