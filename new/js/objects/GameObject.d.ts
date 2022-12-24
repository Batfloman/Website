import { SystemObject } from "./SystemObject";
import { Geometry } from "../physic/geometry/Geometry";
import * as THREE from "three";
export declare class GameObject extends SystemObject {
    geometry: Geometry | THREE.BufferGeometry;
    constructor(geometry: Geometry);
    update(dt: number): void;
    render(): void;
    shouldUpdate(): boolean;
    shouldRender(): boolean;
}
