import * as THREE from "three";
import { Geometry } from "./geometry/Geometry.js";

export abstract class GameObject {
  mesh: THREE.Mesh | Geometry;

  constructor(mesh: THREE.Mesh | Geometry) {
    this.mesh = mesh;
  }

  abstract update(dt: number): void;
}
