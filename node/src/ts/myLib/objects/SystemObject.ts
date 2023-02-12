import * as THREE from "three";

export abstract class SystemObject {
  threeObj: THREE.Object3D;

  constructor(obj: THREE.Object3D) {
    this.threeObj = obj;
  }

  abstract update(dt: number): void;
}
