import { Geometry } from "../physic/geometry/Geometry.js";
import * as THREE from "three";
export declare class Scene {
    meshes: Geometry[] | THREE.Mesh[];
    add: (mesh: Geometry | THREE.Mesh) => (Geometry | THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>)[];
    remove: (mesh: Geometry | THREE.Mesh) => Geometry | THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | undefined;
}
