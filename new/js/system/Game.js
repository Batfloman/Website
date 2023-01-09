import { Util } from "../util/Util.js";
import { System } from "./System.js";
import * as THREE from "three";
export class Game extends System {
    gameObjects = [];
    renderer;
    camera;
    scene;
    constructor(canvas) {
        super();
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
    }
    loop(dt) {
        this.renderer.render(this.scene, this.camera);
    }
    object = {
        add: (obj) => {
            Util.array.addItem(this.gameObjects, obj);
            this.scene.add(obj.mesh);
        },
        remove: (obj) => {
            Util.array.removeItem(this.gameObjects, obj);
            this.scene.remove(obj.mesh);
        },
    };
}
