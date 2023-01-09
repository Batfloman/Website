import { Geometry } from "../objects/geometry/Geometry.js";
export declare class Scene {
    meshes: THREE.Mesh[] | Geometry[];
    add: (mesh: THREE.Mesh | Geometry) => (Geometry | import("three").Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]>)[];
    remove: (mesh: THREE.Mesh | Geometry) => Geometry | import("three").Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]> | undefined;
}
