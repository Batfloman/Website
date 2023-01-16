import * as THREE from "three";

export abstract class SystemObject {
  mesh: THREE.Mesh | THREE.Group;

  constructor(mesh: THREE.Mesh | THREE.Group) {
    this.mesh = mesh;
  }

  abstract update(dt: number): void;
}
