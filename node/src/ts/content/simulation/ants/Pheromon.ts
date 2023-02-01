import { Game } from "../../../myLib/system/Game.js";
import { Util } from "../../../myLib/util/Util.js";
import { settings } from "./main.js";
import * as THREE from "three";
import { WorldObject } from "../../../myLib/objects/WorldObject.js";

export type Message = "home" | "food";

export class Pheromon extends WorldObject {
  private message: Message;
  private lifeDuration: number;
  private startStrength: number;
  private strength: number;

  constructor(
    pos: THREE.Vector3 | THREE.Vector2,
    message: Message,
    strength: number,
    color = 0xffffff * Math.random()
  ) {
    // const geo = new THREE.CircleGeometry(settings.pheromon.size);
    const geo = new THREE.BoxGeometry(settings.pheromon.size, settings.pheromon.size, 0);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true });
    const mesh = new THREE.Mesh(geo, mat);

    super(mesh, pos);

    this.message = message;
    this.startStrength = this.strength = strength;
    this.lifeDuration = settings.pheromon.duration;
  }

  update(dt: number): void {
    this.lifeDuration -= Util.math.convert.dtToSecValue(dt, 1000);

    const opacity = this.lifeDuration / settings.pheromon.duration;
    if (this.mesh.material instanceof THREE.Material) {
      this.mesh.material.opacity = opacity;
      this.mesh.material.needsUpdate = true;
    }

    if (this.lifeDuration <= 0) {
      Game.instance.object.remove(this);
    }
  }

  get = {
    pos: (): THREE.Vector3 => this.pos,
    message: (): Message => this.message,
    strength: (): number => this.startStrength,
  };
}
