import { Ant } from "./Ant.js";
import * as THREE from "three";
import { Game } from "../../../myLib/system/Game.js";
import { settings } from "./main.js";
import { WorldObject } from "../../../myLib/objects/WorldObject.js";
export class Hive extends WorldObject {
    foodStored;
    timeSinceLastAntSpawn = 0;
    color;
    constructor(pos, foodStorage = 0, color = 0xffffff * Math.random()) {
        const geo = new THREE.CircleGeometry(settings.hive.size);
        const mat = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        super(mesh, new THREE.Vector3(pos.x, pos.y, 0));
        this.color = color;
        this.foodStored = foodStorage;
    }
    update(dt) {
        this.timeSinceLastAntSpawn += dt;
        if (this.timeSinceLastAntSpawn < settings.hive.spawnCooldown)
            return;
        if (this.foodStored < settings.hive.antCost)
            return;
        this.timeSinceLastAntSpawn = 0;
        this.foodStored -= settings.hive.antCost;
        this.spawnAnt();
    }
    spawnAnt() {
        const ant = new Ant(this.pos, this.color);
        // ant.rotateAroundZ(Util.math.random.between(0, 360));
        Game.instance.object.add(ant);
    }
    set = {
        foodStored: (num) => (this.foodStored = num),
    };
}
