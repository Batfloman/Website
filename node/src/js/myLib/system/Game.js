import { Util } from "../util/Util.js";
import { LoopingSystem } from "./LoopingSystem.js";
import * as THREE from "three";
export class Game extends LoopingSystem {
    gameObjects = [];
    renderer;
    camera;
    scene;
    constructor(canvas, elements) {
        super();
        this.renderer = elements?.renderer ?? new THREE.WebGLRenderer({ canvas });
        this.camera = elements?.camera ?? new THREE.Camera();
        this.scene = elements?.scene ?? new THREE.Scene();
        window.addEventListener("resize", this.resize);
        this.resize();
    }
    loop(dt) {
        this.renderer.render(this.scene, this.camera);
    }
    object = {
        add: (obj) => {
            console.log("add", obj);
            Util.array.addItem(this.gameObjects, obj);
            this.scene.add(obj.mesh);
        },
        remove: (obj) => {
            Util.array.removeItem(this.gameObjects, obj);
            this.scene.remove(obj.mesh);
        },
    };
    get = {
        clock: () => this.clock,
        runningStatus: () => this.isRunning,
        objects: () => this.gameObjects,
        renderer: () => this.renderer,
        camera: () => this.camera,
        scene: () => this.scene,
    };
    resize() {
        const w = this.renderer.domElement.clientWidth;
        const h = this.renderer.domElement.clientHeight;
        this.renderer.setSize(w, h, false);
        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        }
    }
}
