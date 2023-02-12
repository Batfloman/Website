import { Game } from "../../../myLib/system/Game.js";
import { Util } from "../../../myLib/util/Util.js";
import { settings } from "./main.js";
import * as THREE from "three";
import { WorldObject } from "../../../myLib/objects/WorldObject.js";
export class Pheromon extends WorldObject {
    message;
    lifeDuration;
    startStrength;
    strength;
    constructor(pos, message, strength, color = 0xffffff * Math.random()) {
        // const geo = new THREE.CircleGeometry(settings.pheromon.size);
        const geo = new THREE.BoxGeometry(settings.pheromon.size, settings.pheromon.size, 0);
        const mat = new THREE.MeshBasicMaterial({ color, transparent: true });
        const mesh = new THREE.Mesh(geo, mat);
        super(mesh, pos);
        this.message = message;
        this.startStrength = this.strength = strength;
        this.lifeDuration = settings.pheromon.duration;
    }
    update(dt) {
        this.lifeDuration -= Util.math.convert.dtToSecValue(dt, 1000);
        const opacity = this.lifeDuration / settings.pheromon.duration;
        if (this.threeObj.material instanceof THREE.Material) {
            this.threeObj.material.opacity = opacity;
            this.threeObj.material.needsUpdate = true;
        }
        if (this.lifeDuration <= 0) {
            Game.instance.object.remove(this);
        }
    }
    get = {
        pos: () => this.pos,
        message: () => this.message,
        strength: () => this.startStrength,
    };
}
