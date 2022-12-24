import { SystemObject } from "./SystemObject";
import { Geometry } from "../physic/geometry/Geometry";
import * as THREE from "three";

export class GameObject extends SystemObject {
  geometry: Geometry | THREE.BufferGeometry;

  constructor(geometry: Geometry) {
    super();
    
    this.geometry = geometry;
  }

  update(dt: number): void {
    throw new Error("Method not implemented.");
  }
  render(): void {
    throw new Error("Method not implemented.");
  }
  shouldUpdate(): boolean {
    throw new Error("Method not implemented.");
  }
  shouldRender(): boolean {
    throw new Error("Method not implemented.");
  }
}
