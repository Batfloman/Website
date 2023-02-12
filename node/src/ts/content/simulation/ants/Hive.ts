import { SystemObject } from "../../../myLib/objects/SystemObject.js";
import { Ant } from "./Ant.js";
import * as THREE from "three";
import { Game } from "../../../myLib/system/Game.js";
import { settings } from "./main.js";
import { WorldObject } from "../../../myLib/objects/WorldObject.js";
import { Util } from "../../../myLib/util/Util.js";
import { ReinhardToneMapping } from "three";

export class Hive extends WorldObject {
  private foodStored: number;
  private timeSinceLastAntSpawn = 0;

  private color: number;

  constructor(pos: THREE.Vector3 | THREE.Vector2, foodStorage: number = 0, color: number = 0xffffff * Math.random()) {
    const geo = new THREE.CircleGeometry(settings.hive.size);
    const mat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);

    super(mesh, pos);

    this.color = color;
    this.foodStored = foodStorage;
  }

  update(dt: number): void {
    this.timeSinceLastAntSpawn += dt;

    if (this.timeSinceLastAntSpawn < settings.hive.spawnCooldown) return;
    if (this.foodStored < settings.hive.antCost) return;

    this.timeSinceLastAntSpawn = 0;

    this.foodStored -= settings.hive.antCost;

    this.spawnAnt();
  }

  public addFood(amount: number): void {
    this.foodStored += amount;
  }

  private spawnAnt() {
    const ant = new Ant(this.pos, this.color);
    ant.rotateAboutZ(Util.math.random.between(0, 360));
    Game.instance.object.add(ant);
  }

  public set = {
    foodStored: (num: number) => (this.foodStored = num),
  };
}
