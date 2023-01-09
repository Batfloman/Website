import { Geometry } from "../objects/geometry/Geometry.js";
import { Util } from "../util/Util.js";

export class Scene {
  meshes: THREE.Mesh[] | Geometry[] = [];

  add = (mesh: THREE.Mesh | Geometry) => Util.array.addItem(this.meshes, mesh);
  remove = (mesh: THREE.Mesh | Geometry) => Util.array.removeItem(this.meshes, mesh);
}
