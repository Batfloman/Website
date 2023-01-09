import * as THREE from "three";

export abstract class GameObject {
  mesh: THREE.Mesh;

  constructor(mesh: THREE.Mesh) {
    this.mesh = mesh;
  }

  abstract update(dt: number): void;
}
