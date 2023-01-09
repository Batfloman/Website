import * as THREE from "three";
export declare abstract class GameObject {
    mesh: THREE.Mesh;
    constructor(mesh: THREE.Mesh);
    abstract update(dt: number): void;
}
