"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneObject = void 0;
const Camara_js_1 = __importDefault(require("../display/Camara.js"));
class SceneObject {
    constructor() {
        this.zIndex = 0;
    }
    init(system) {
        this.system = system;
    }
    getCamara() {
        return this.system.activeScene == undefined ? new Camara_js_1.default(this.system.canvas) : this.system.activeScene.camara;
    }
}
exports.SceneObject = SceneObject;
