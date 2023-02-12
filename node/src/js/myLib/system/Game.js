import { Util } from "../util/Util.js";
import { LoopingSystem } from "./LoopingSystem.js";
import * as THREE from "three";
export class Game extends LoopingSystem {
    static instance;
    gameObjects = [];
    sortedObjects = new Map();
    renderer;
    camera;
    scene;
    controls;
    constructor(canvas, elements) {
        super();
        Game.instance = this;
        this.renderer = elements?.renderer ?? new THREE.WebGLRenderer({ canvas });
        this.camera = elements?.camera ?? new THREE.Camera();
        this.scene = elements?.scene ?? new THREE.Scene();
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    loop(dt) {
        this.gameObjects.forEach((obj) => {
            obj.update(dt);
        });
        this.renderer.render(this.scene, this.camera);
    }
    object = {
        add: (...objects) => {
            objects.forEach((obj) => {
                // add to game
                Util.array.addItem(this.gameObjects, obj);
                if (!obj.threeObj.parent)
                    this.scene.add(obj.threeObj);
                // add to sorted Map
                const sortedObjects = Game.instance.get.sortedObjects();
                const classes = Util.object.findAllClassNames(obj);
                classes.forEach((clas) => {
                    Util.map.addItem(sortedObjects, clas, obj);
                });
            });
        },
        remove: (obj) => {
            Util.array.removeItem(this.gameObjects, obj);
            this.scene.remove(obj.threeObj);
            const sortedObjects = Game.instance.get.sortedObjects();
            const classes = Util.object.findAllClassNames(obj);
            classes.forEach((clas) => {
                Util.map.removeItem(sortedObjects, clas, obj);
            });
        },
        getAll(className) {
            const sortedObjects = Game.instance.get.sortedObjects();
            return sortedObjects.get(className) ?? [];
        },
    };
    get = {
        clock: () => this.clock,
        runningStatus: () => this.isRunning,
        objects: () => this.gameObjects,
        renderer: () => this.renderer,
        camera: () => this.camera,
        scene: () => this.scene,
        sortedObjects: () => this.sortedObjects,
    };
    resize() {
        const w = this.renderer.domElement.clientWidth;
        const h = this.renderer.domElement.clientHeight;
        this.renderer.setSize(w, h, false);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        }
    }
}
