import { SystemObject } from "./SystemObject.js";
import * as THREE from "three";
export declare class GameObject extends SystemObject {
    mesh: THREE.Mesh;
    constructor(mesh: THREE.Mesh);
    update(dt: number): void;
}
