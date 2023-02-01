import * as THREE from "three";
import { settings } from "./main.js";
import { Game } from "../../../myLib/system/Game.js";
import { WorldObject } from "../../../myLib/objects/WorldObject.js";

export class Food extends WorldObject {
  private maxRadius: number;
  private amountFood: number;

  private radius: number;

  constructor(pos: THREE.Vector2, amountFood: number) {
    const radius = (1 / settings.food.maxValue) * amountFood;

    const geo = new THREE.CircleGeometry(radius);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ff77 });
    const mesh = new THREE.Mesh(geo, mat);
    super(mesh, new THREE.Vector3(pos.x, pos.y, 0));

    this.maxRadius = this.radius = radius;
    this.amountFood = amountFood;
  }

  update(dt: number): void {}

  public takeFood(amount: number): number {
    this.amountFood -= amount;

    const radius = (1 / settings.food.maxValue) * this.amountFood;
    const factor = radius / this.maxRadius;
    this.radius = this.maxRadius * factor;

    this.setScale(factor);

    if (this.amountFood <= 0) Game.instance.object.remove(this);

    return amount;
  }

  override get = {
    pos: () => this.pos,
    radius: () => this.radius,
  };
}
