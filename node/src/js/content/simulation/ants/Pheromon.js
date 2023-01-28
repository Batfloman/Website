import { SystemObject } from "../../../myLib/objects/SystemObject.js";
import { Game } from "../../../myLib/system/Game.js";
import { Util } from "../../../myLib/util/Util.js";
import { settings } from "./main.js";
export class Pheromon extends SystemObject {
    message;
    strength;
    constructor(mesh, message) {
        super(mesh);
        this.message = message;
        this.strength = 100;
    }
    update(dt) {
        this.strength -= Util.math.convert.dtToSecValue(dt, settings.pheromon.duration);
        if (this.strength <= 0) {
            Game.instance.object.remove(this);
        }
    }
}
