import * as THREE from "three";
import { Geometry } from "../physic/geometry/Geometry.js";
export declare abstract class GameObject {
    mesh: THREE.Mesh | Geometry;
    constructor(mesh: THREE.Mesh | Geometry);
    abstract update(dt: number): void;
}
