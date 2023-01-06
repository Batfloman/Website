import { Util } from "../util/Util.js";
export class Scene {
    meshes = [];
    add = (mesh) => Util.array.addItem(this.meshes, mesh);
    remove = (mesh) => Util.array.removeItem(this.meshes, mesh);
}
