import { SystemObject } from "../../../myLib/objects/SystemObject.js";
import { Game } from "../../../myLib/system/Game.js";
import { Util } from "../../../myLib/util/Util.js";
import { settings } from "./main.js";

export type Message = "home" | "food";

export class Pheromon extends SystemObject {
  message: Message;
  strength: number;

  constructor(mesh: THREE.Mesh, message: Message) {
    super(mesh);

    this.message = message;
    this.strength = 100;
  }

  update(dt: number): void {
    this.strength -= Util.math.convert.dtToSecValue(dt, settings.pheromon.duration);

    if (this.strength <= 0) {
      Game.instance.object.remove(this);
    }
  }
}
