import { SystemObject } from "./SystemObject.js";
import * as THREE from "three";

export class GameObject extends SystemObject {
  mesh: THREE.Mesh;

  constructor(mesh: THREE.Mesh) {
    super();
    
    this.mesh = mesh;
  }

  update(dt: number): void {
    throw new Error("Method not implemented.");
  }
}
