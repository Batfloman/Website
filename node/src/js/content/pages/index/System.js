import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Util } from "../../../myLib/util/Util.js";
export class System {
    objects = [];
    clock;
    renderer;
    camera;
    scene;
    controls;
    running = false;
    constructor(canvas, camera, scene) {
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.camera = camera ?? new THREE.Camera();
        this.scene = scene ?? new THREE.Scene();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.clock = new THREE.Clock(false);
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        this.innerLoop();
    }
    stop = () => (this.running = false);
    start = () => {
        this.running = true;
        this.clock.start();
    };
    innerLoop() {
        const dt = this.clock.getDelta();
        if (this.running) {
            this.objects.forEach((obj) => obj.update(dt));
            this.renderer.render(this.scene, this.camera);
        }
        requestAnimationFrame(() => this.innerLoop());
    }
    object = {
        add: (obj) => {
            Util.array.addItem(this.objects, obj);
            this.scene.add(obj.mesh);
        },
        remove: (obj) => {
            Util.array.removeItem(this.objects, obj);
            this.scene.remove(obj.mesh);
        },
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
    get = {
        scene: () => this.scene,
        camera: () => this.camera,
        renderer: () => this.renderer,
        objects: () => this.objects,
        status: () => this.running,
    };
}
