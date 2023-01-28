import * as THREE from "three";

export abstract class SystemObject {
  mesh: THREE.Mesh;

  constructor(mesh: THREE.Mesh) {
    this.mesh = mesh;
  }

  abstract update(dt: number): void;
}
